//boilerplate for express
import cors from 'cors';
import express from 'express';
import { requireApiKey } from '../middlewares/middleware.api-key';
import { declareEnvs } from '../services/service.envs';
import { apiRouter } from './api';

const { AUTH_KEY } = declareEnvs(['AUTH_KEY']);

const app = express();

app.use(cors());
app.use(express.json());

app.get(
  '/.well-known/acme-challenge/rhRjhuU-rUN2lcjFk4MihLntcz0lXDrn8RnF5HQ2uAk',
  (req, res) => {
    res.send(
      'rhRjhuU-rUN2lcjFk4MihLntcz0lXDrn8RnF5HQ2uAk.C-Nb31U8v5zWaMCZjWBFyOKbK3ZSYuZuA0tKxpjLCRM'
    );
  }
);

app.use(requireApiKey(AUTH_KEY));

app.use('/api', apiRouter);

export { app };
