import GeneralError from './GeneralError'
import NotFoundError from './NotFoundError'
import BadRequestError from './BadRequestError'
import ForbiddenRequestError from './ForbiddenRequestError'
import UnauthorizedRequestError from './UnauthorizedRequestError'

export type ErrorCode = 400 | 401 | 403 | 404 | 500

export type RequestError =
  | GeneralError
  | NotFoundError
  | BadRequestError
  | ForbiddenRequestError
  | UnauthorizedRequestError
