import { NextFunction, Request, Response } from 'express';

import { NotAuthorizedError } from '../services/errors';
import { wLog } from '../services/service.logs';

/**
 * Wrapper di un middleware che richiede un API Key per accedere alla route a cui è applicato
 */
export const requireApiKey = (apiKey: string, exceptions: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const route = `${req.method} ${req.path}`;
    const timestamp = new Date().toISOString();

    if (req.headers['x-api-key'] !== apiKey && !exceptions.includes(route)) {
      wLog(`${timestamp} | ${route} | Invalid API Key `, 'error');
      throw new NotAuthorizedError();
    }

    wLog(`${timestamp} | ${req.ip} > ${route}`, 'info');

    next();
  };
};
