import GeneralError from './GeneralError'
import { ErrorCode } from './types'

class BadRequestError extends GeneralError {
  get code(): ErrorCode {
    return 400
  }
}

export default BadRequestError
