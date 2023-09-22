import { NextFunction, Request, Response } from 'express';
const { log } = require('../../utils/service.logs');

export default function pathLogging(
  req: Request,
  res: Response,
  next: NextFunction
) {
  log(`Routing ${req.method} ${req.url} to ${Bun.env.PROXY_TARGET}`, 'info');
  next();
}
