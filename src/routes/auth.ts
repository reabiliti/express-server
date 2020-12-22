import { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

import { User } from '../entity/User'
import validateRequest from '../middlewares/validateRequest'
import signUpValidator from '../validators/signUpValidator'
import signInValidator from '../validators/signInValidator'

const auth = Router()

auth.post(
  '/signup',
  validateRequest(signUpValidator),
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate)
        return res.status(400).json({ message: 'User has already existed' })

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = User.create({ name, email, password: hashedPassword })
      await user.save()

      return res.status(201).json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
)

auth.post(
  '/signin',
  validateRequest(signInValidator),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      const invalidLoginMessage = { message: 'Invalid pair Email/Password' }
      if (!user) return res.status(400).json(invalidLoginMessage)

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json(invalidLoginMessage)

      const token = jwt.sign({ userId: user.id }, config.get('jwt.secret'), {
        expiresIn: config.get('jwt.expiresIn'),
      })

      res.json({ token, userId: user.id })
    } catch (err) {
      res.status(500).json(err)
    }
  }
)

export default auth
