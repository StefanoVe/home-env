const { log, LogManager } = require('../../../utils/service.logs');

export let logsManager = LogManager.init([' GET /api/debug/logs']);

/**
 * wrapper del logger per permettere il tracciamento dei log generati
 */
export const wLog = (
  message: string,
  type: 'success' | 'info' | 'error' | 'start' | 'warning' | 'end'
) => {
  if (!logsManager) {
    //escludo dal tracker i log generati quando un utente va nella sezione debug
    logsManager = LogManager.init([' GET /api/debug/logs']);
  }

  log(message, type, logsManager);
};
