//boilerplate for express
import cors from 'cors';
import express from 'express';
import { requireApiKey } from '../middlewares/middleware.api-key';
import { declareEnvs } from '../services/service.envs';
import { apiRouter } from './api';

const { AUTH_KEY, HOMEBRIDGE_PORT, HOMEBRIDGE_URL } = declareEnvs([
  'AUTH_KEY',
  'HOMEBRIDGE_PORT',
  'HOMEBRIDGE_URL',
]);

const _homebridgeUrl = `http://${HOMEBRIDGE_URL}:${HOMEBRIDGE_PORT}`;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/homebridge', (req, res) => {
  res.redirect(_homebridgeUrl);
});

app.use(requireApiKey(AUTH_KEY, ['GET /api/homebridge']));

app.use('/api', apiRouter);

app.use('**', (req, res) => {
  res.status(404).send('Not Found');
});

export { app };
