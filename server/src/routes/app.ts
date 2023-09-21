//boilerplate for express
import cors from 'cors';
import express from 'express';
import { requireApiKey } from '../middlewares/require-api-key';
import { declareEnvs } from '../services/service.envs';
import { apiRouter } from './api';

const { AUTH_KEY } = declareEnvs(['AUTH_KEY']);

const app = express();

app.use(cors());
app.use(express.json());

app.use(requireApiKey(AUTH_KEY));

app.use('/api', apiRouter);

export { app };
