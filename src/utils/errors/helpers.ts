import GeneralError from './GeneralError'
import NotFoundError from './NotFoundError'
import BadRequestError from './BadRequestError'

export const buildGeneralError = (err: Error): GeneralError =>
  new GeneralError({ message: err.message, originalError: err })

export const buildNotFoundError = (message: string): NotFoundError =>
  new NotFoundError({ message })

export const buildBadRequestError = (
  message: string,
  errors?: []
): BadRequestError => new BadRequestError({ message, errors })
