import { Request, Response, Router } from 'express'
import { User } from '../entity/User'

const usersRoutes = Router()

// GET Users
usersRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// UPDATE User
usersRoutes.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email, password } = req.body

  try {
    const user = await User.findOneOrFail(id)

    user.name = name || user.name
    user.email = email || user.email
    user.password = password || user.password

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// DELETE User
usersRoutes.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findOneOrFail(id)

    await user.remove()

    return res.status(204)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// FIND User
usersRoutes.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findOneOrFail(id)

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
})

export default usersRoutes
