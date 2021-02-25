import { NextFunction, Response, Router } from 'express'

import { User } from '../entity/User'
import { buildNotFoundError } from '../utils/errors'
import { asyncWrapper } from './helpers'
import authenticateJWT from '../middlewares/authenticateJwt'
import { IUserRequest } from '../request/interfaces'

const users = Router()

users.use(authenticateJWT)

// GET Users
users.get(
  '/',
  asyncWrapper(
    async (req: IUserRequest, res: Response, _next: NextFunction) => {
      const userList = await User.find()

      return res.json(userList)
    }
  )
)

// UPDATE User
users.put(
  '/:id',
  asyncWrapper(async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { name, email, password } = req.body

    const user = await User.findOne(id)
    if (!user) return next(buildNotFoundError('User not found'))

    user.firstName = name || user.firstName
    user.email = email || user.email
    user.passwordHash = password || user.passwordHash

    await user.save()

    return res.json(user)
  })
)

// DELETE User
users.delete(
  '/:id',
  asyncWrapper(async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = await User.findOne(id)
    if (!user) return next(buildNotFoundError('User not found'))

    await user.remove()

    return res.status(204).json()
  })
)

// FIND User
users.get(
  '/:id',
  asyncWrapper(async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = await User.findOne(id)
    if (!user) return next(buildNotFoundError('User not found'))

    return res.json(user)
  })
)

export default users
