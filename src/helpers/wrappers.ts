import { NextFunction, Request, Response } from 'express'
import { buildGeneralError } from '../utils/errors'

export const asyncWrapper = (fn) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(buildGeneralError(err))
    }
  }
}
