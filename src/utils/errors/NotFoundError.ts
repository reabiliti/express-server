import GeneralError from './GeneralError'
import { ErrorCode } from './types'

class NotFoundError extends GeneralError {
  get code(): ErrorCode {
    return 404
  }
}

export default NotFoundError
