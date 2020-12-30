import jwt from 'jsonwebtoken'
import config from 'config'

export const generateAuthToken = (userId: string): string =>
  jwt.sign({ userId }, config.get('jwt.secret'), {
    expiresIn: config.get('jwt.expiresIn'),
  })
