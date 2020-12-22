import { NextFunction, Request, Response } from 'express'

const validateRequest = (validator) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validator(req.body)) return next()

  const { errors } = validator
  return res.status(400).json({
    errors,
  })
}

export default validateRequest
