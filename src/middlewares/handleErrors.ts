import { NextFunction, Request, Response } from 'express'
import { RequestError } from '../utils/errors'

type BodyError = {
  status: string
  message: string
  errors: []
}

const bodyError = (err: RequestError): BodyError => ({
  status: 'error',
  message: err.message,
  errors: err.errors,
})

const handleErrors = (
  err: RequestError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err)
  return res.status(err.code).json(bodyError(err))
}

export default handleErrors
