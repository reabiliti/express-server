import { Router } from 'express'
import auth from './auth'
import users from './users'

const routes = Router()

routes.use('/users', users)
routes.use('/auth', auth)

export default routes
