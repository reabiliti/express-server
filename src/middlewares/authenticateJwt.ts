import { NextFunction, Response } from 'express'

import { JWT } from '../security/jwt'
import {
  buildForbiddenRequestError,
  buildUnauthorizedRequestError,
} from '../utils/errors'
import { User } from '../entity/User'
import { IUserRequest } from '../request/interfaces'

const authenticateJWT = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    const [err, decoded] = await JWT.verifyToken(token)
    if (err) return next(buildForbiddenRequestError(err.message, err))

    const user: User = await User.findOne(decoded.userId)
    if (!user) return next(buildForbiddenRequestError('Access is forbidden'))

    req.user = user
    next()
  } else {
    next(buildUnauthorizedRequestError('Unauthorized Request'))
  }
}

export default authenticateJWT
