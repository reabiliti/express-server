import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

const validateResultMiddleware = (message: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message,
    })
  }

  next()
}

export default validateResultMiddleware
