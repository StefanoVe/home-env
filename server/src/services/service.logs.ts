const { log, LogManager } = require('../../../utils/service.logs');

export let logsManager = LogManager.init([' GET /api/debug/logs']);

export const wLog = (
  message: string,
  type: 'success' | 'info' | 'error' | 'start' | 'warning' | 'end'
) => {
  if (!logsManager) {
    logsManager = LogManager.init([' GET /api/debug/logs']);
  }

  log(message, type, logsManager);
};
