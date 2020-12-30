import { NextFunction, Request, Response, Router } from 'express'

import { User } from '../entity/User'
import validateRequest from '../middlewares/validateRequest'
import signUpValidator from '../validators/signUpValidator'
import signInValidator from '../validators/signInValidator'
import { buildBadRequestError } from '../utils/errors'
import { asyncWrapper } from '../helpers/wrappers'
import { PasswordHash } from '../security/passwordHash'
import { JWT } from '../security/jwt'

const auth = Router()

auth.post(
  '/signup',
  validateRequest(signUpValidator),
  asyncWrapper(async (req: Request, res: Response, next: NewableFunction) => {
    const { firstName, lastName, email, password } = req.body

    const candidate = await User.findOne({ email })
    if (candidate) return next(buildBadRequestError('User has already existed'))

    const passwordHash = await PasswordHash.hashPassword(password)
    const user = User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    })
    await user.save()

    return res.status(201).json(user)
  })
)

auth.post(
  '/signin',
  validateRequest(signInValidator),
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const invalidLoginError = buildBadRequestError(
      'Invalid pair Email/Password'
    )
    if (!user) return next(invalidLoginError)

    const isMatch = await PasswordHash.comparePasswords(
      password,
      user.passwordHash
    )
    if (!isMatch) return next(invalidLoginError)

    const token: string = await JWT.generateToken(user.id)

    res.json({ token, userId: user.id })
  })
)

export default auth
