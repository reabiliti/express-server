import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { Express } from 'express'
import config from 'config'

import routes from './routes'
import handleErrors from './middlewares/handleErrors'
import { getMorgan } from './utils/morgan'

const app: Express = express()
app.use(getMorgan())
app.use(express.json())
app.use(routes)
app.use(handleErrors)

const PORT: number = config.get('port')

createConnection()
  .then((): void => {
    app.listen(PORT, (): void =>
      console.log(`App has been started on port ${PORT}`)
    )
  })
  .catch((error) => console.log(error))
