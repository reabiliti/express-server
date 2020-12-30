import { NextFunction, Request, Response } from 'express'
import { buildBadRequestError } from '../utils/errors'
import handleErrors from './handleErrors'

const validateRequest = (validator) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validator(req.body)) return next()

  const { errors }: { errors: [] } = validator
  const err = buildBadRequestError('Bad Params', errors)
  handleErrors(err, req, res, next)
}

export default validateRequest
