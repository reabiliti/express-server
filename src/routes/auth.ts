import { NextFunction, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'

import { User } from '../entity/User'
import validateRequest from '../middlewares/validateRequest'
import signUpValidator from '../validators/signUpValidator'
import signInValidator from '../validators/signInValidator'
import { comparePasswords, generatePasswordHash } from '../helpers/passwords'
import { buildBadRequestError, buildGeneralError } from '../utils/errors'

const auth = Router()

auth.post(
  '/signup',
  validateRequest(signUpValidator),
  async (req: Request, res: Response, next: NewableFunction) => {
    try {
      const { firstName, lastName, email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate)
        return next(buildBadRequestError('User has already existed'))

      const passwordHash = await generatePasswordHash(password)
      const user = User.create({
        firstName,
        lastName,
        email,
        passwordHash,
      })
      await user.save()

      return res.status(201).json(user)
    } catch (err) {
      next(buildGeneralError(err))
    }
  }
)

auth.post(
  '/signin',
  validateRequest(signInValidator),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      const invalidLoginError = buildBadRequestError(
        'Invalid pair Email/Password'
      )
      if (!user) return next(invalidLoginError)

      const isMatch = await comparePasswords(password, user.passwordHash)
      if (!isMatch) return next(invalidLoginError)

      const token = jwt.sign({ userId: user.id }, config.get('jwt.secret'), {
        expiresIn: config.get('jwt.expiresIn'),
      })

      res.json({ token, userId: user.id })
    } catch (err) {
      next(buildGeneralError(err))
    }
  }
)

export default auth
