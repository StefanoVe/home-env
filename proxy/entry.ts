import cors from 'cors';
import express from 'express';
import proxy from 'express-http-proxy';
import log from './middlewares/middleware.log';
import { postTargetRouter } from './routes/post.target';

export let instance: ReturnType<typeof main> | null = null;
export let targetValue: string | null = null;

const bufferToString = (buffer: Buffer) => buffer.toString('utf-8');

export const main = (target: string) => {
  targetValue = target;

  //init an express app
  const app = express();
  //add middleware
  app.use(cors());
  app.use(express.json());

  //configuro una route per aggiornare il target del proxy
  app.use('/target', postTargetRouter);

  //aggiungo il resto dei middlewares
  app.use(log);
  app.use(proxy(target));

  //start the server
  const _instance = app.listen(Bun.env.PROXY_PORT, () => {
    console.log(
      `Proxy is running on port ${Bun.env.PROXY_PORT}, target: ${target}`
    );

    const { stderr, stdout, exitCode } = Bun.spawnSync(
      `ping -c 1 ${
        target
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split(':')[0]
      }`.split(' ')
    );

    if (exitCode) {
      console.log(bufferToString(stdout as unknown as Buffer));
      console.error(`Failed to ping ${target}`);
    } else {
      console.log(`${target} is reachable`);
    }
  });

  instance = _instance;

  return _instance;
};

main(Bun.env.PROXY_TARGET || 'http://localhost:3000');
