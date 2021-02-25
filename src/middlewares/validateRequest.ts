import { NextFunction, Request, Response } from 'express'
import { buildBadRequestError } from '../utils/errors'

const validateRequest = (validator) => async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (validator(req.body)) return next()

  const { errors }: { errors: [] } = validator
  next(buildBadRequestError('Bad Params', errors))
}

export default validateRequest
