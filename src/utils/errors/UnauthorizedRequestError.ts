import GeneralError from './GeneralError'
import { ErrorCode } from './types'

class UnauthorizedRequestError extends GeneralError {
  get code(): ErrorCode {
    return 401
  }
}

export default UnauthorizedRequestError
