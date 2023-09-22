import fs from 'fs';
import https from 'https';
import { log } from '../../utils/service.logs';
import { app } from './routes/app';
import { declareEnvs } from './services/service.envs';
import { UptimeTracker } from './services/service.uptime';

const { PORT } = declareEnvs(['PORT']);

export const _uptimeService = UptimeTracker.init(false);
export const currentVersion = '0.5.1';

const main = async () => {
  log('[!] Starting application', 'start');

  let _app: any = app;

  if (Bun.env.ENV === 'production') {
    const dir = Bun.env.SSL_ENTRYPOINT_PATH;
    const key = fs.readFileSync(`${dir}/privkey.pem`);

    const cert = fs.readFileSync(`${dir}/fullchain.pem`);

    const _sslApp = https.createServer(
      {
        key,
        cert,
      },
      app as any
    );

    _app = _sslApp;
  }

  _app.listen(PORT, () => {
    log(`[!] Listening on ${PORT}`, 'info');
  });
};

main();
