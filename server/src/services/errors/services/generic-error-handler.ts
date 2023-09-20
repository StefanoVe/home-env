import { log } from '../../services.logs';
import { BadRequestError } from '../specific';

//aggiungere funzione che manda email di conferma operazione all'email che ha richiesto il servizio.

export const genericErrorHandler = async (error: Error, inviaMail = true) => {
  log(JSON.stringify(error), 'error');

  const message =
    error && error.message
      ? error.message
      : `Errore generico ${JSON.stringify(error)}`;

  const emailAdmin = Bun.env.EMAIL_ADMIN;
  const emailMod = Bun.env.EMAIL_MOD || '';
  const produzione = 'true' === Bun.env.PRODUZIONE;

  throw new BadRequestError(message);
};
