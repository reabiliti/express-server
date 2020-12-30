import { NextFunction, Request, Response, Router } from 'express'

import { User } from '../entity/User'
import { buildGeneralError, buildNotFoundError } from '../utils/errors'

const users = Router()

// GET Users
users.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userList = await User.find()

    return res.json(userList)
  } catch (err) {
    next(buildGeneralError(err))
  }
})

// UPDATE User
users.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, email, password } = req.body

  try {
    const user = await User.findOneOrFail(id)

    user.firstName = name || user.firstName
    user.email = email || user.email
    user.passwordHash = password || user.passwordHash

    await user.save()

    return res.json(user)
  } catch (err) {
    next(buildGeneralError(err))
  }
})

// DELETE User
users.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      const user = await User.findOneOrFail(id)

      await user.remove()

      return res.status(204)
    } catch (err) {
      next(buildGeneralError(err))
    }
  }
)

// FIND User
users.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const user = await User.findOne(id)
    if (!user) return next(buildNotFoundError('User not found'))

    return res.json(user)
  } catch (err) {
    next(buildGeneralError(err))
  }
})

export default users
