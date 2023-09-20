import { app } from './routes/app';
import { declareEnvs } from './services/service.envs';
import { UptimeTracker } from './services/service.uptime';
import { log } from './services/services.logs';

const { PORT } = declareEnvs(['PORT']);

export const _uptimeService = UptimeTracker.init(false);
export const currentVersion = '0.5.1';

const main = async () => {
  log('[!] Starting application', 'start');

  app.listen(PORT, () => {
    log(`[!] Listening on ${PORT}`, 'info');
  });
};

main();
