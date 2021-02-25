import GeneralError from './GeneralError'
import NotFoundError from './NotFoundError'
import BadRequestError from './BadRequestError'
import ForbiddenRequestError from './ForbiddenRequestError'
import UnauthorizedRequestError from './UnauthorizedRequestError'

export const buildGeneralError = (err: Error): GeneralError =>
  new GeneralError({ message: err.message, originalError: err })

export const buildForbiddenRequestError = (
  message: string,
  err?: Error
): ForbiddenRequestError =>
  new ForbiddenRequestError({ message, originalError: err })

export const buildNotFoundError = (message: string): NotFoundError =>
  new NotFoundError({ message })

export const buildBadRequestError = (
  message: string,
  errors?: []
): BadRequestError => new BadRequestError({ message, errors })

export const buildUnauthorizedRequestError = (
  message: string
): BadRequestError => new UnauthorizedRequestError({ message })
