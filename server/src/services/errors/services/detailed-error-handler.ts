import { wLog } from '../../service.logs';
import { BadRequestError } from '../specific';

/**
 * It logs the error, sends an email to the admin and throws a BadRequestError
 * @param options - {
 * @param options.errorContext //nome del file o eventuali aiuti per trovare l'esatta locazione dell'errore nell'ide
 * @param options.emailBody //testo della mail
 * @param options.error //errore verificato (ottenibile facendo catch)
 */
export const detailedErrorHandler = async (options: {
  errorContext: string;
  emailBody: string;
  error: Error;
  ignoreError?: boolean;
}) => {
  const message = await errorLogger(options);

  if (options.ignoreError) {
    return null;
  }

  throw new BadRequestError(message);
};

export const errorLogger = async (options: {
  errorContext: string;
  emailBody: string;
  error: Error;
}) => {
  const error = options.error;

  wLog(`${error} ${options.errorContext} - ${options.emailBody}`, 'error');

  const message =
    error && error.message
      ? `ERRORE ${options.errorContext}: ${error.message}`
      : `ERRORE ${options.errorContext}: <br /> ${JSON.stringify(error)}`;

  const emailAdmin = Bun.env.EMAIL_ADMIN;
  const emailModerator = Bun.env.EMAIL_MOD || '';

  return message;
};
