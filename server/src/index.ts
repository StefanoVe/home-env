import { app } from './routes/app';
import { declareEnvs } from './services/service.envs';
import { wLog } from './services/service.logs';
import { getCurrentIP } from './services/service.network';
import { UptimeTracker } from './services/service.uptime';

const { PORT } = declareEnvs(['PORT']);

export const _uptimeService = UptimeTracker.init(false);
export const currentVersion = '0.5.1';
export const currentIP = await getCurrentIP();

const main = async () => {
  wLog('[!] Starting application', 'start');

  app.listen(PORT, () => {
    wLog(`[!] Listening on ${PORT}`, 'info');
  });
};

main();
