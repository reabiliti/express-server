import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { Express } from 'express'
import config from 'config'

import usersRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'

const app: Express = express()
app.use(express.json())
const PORT: number = config.get('port')

createConnection()
  .then((): void => {
    app.use('/auth', authRoutes)
    app.use('/users', usersRoutes)

    app.listen(PORT, (): void =>
      console.log(`App has been started on port ${PORT}`)
    )
  })
  .catch((error) => console.log(error))
