import { NextFunction, Request, Response } from 'express';
import { targetValue } from '../entry';
const { log } = require('../../utils/service.logs');

export default function pathLogging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log(`Routing ${req.method} ${req.url} to ${targetValue}`, 'info');
  next();
}
