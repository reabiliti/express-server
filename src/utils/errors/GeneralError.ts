import { ErrorCode } from './types'

type ErrorParams = {
  message: string
  errors?: []
  originalError?: Error
}

class GeneralError {
  message: string
  errors: []
  originalError: Error

  constructor({ message, errors, originalError }: ErrorParams) {
    this.message = message
    this.errors = errors
    this.originalError = originalError
  }

  get code(): ErrorCode {
    return 500
  }
}

export default GeneralError
