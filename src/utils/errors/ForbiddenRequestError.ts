import GeneralError from './GeneralError'
import { ErrorCode } from './types'

class ForbiddenRequestError extends GeneralError {
  get code(): ErrorCode {
    return 403
  }
}

export default ForbiddenRequestError
