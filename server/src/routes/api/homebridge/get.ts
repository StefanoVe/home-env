import express from 'express';
import { _networkService } from '../../..';
import { declareEnvs } from '../../../services/service.envs';

const { HOMEBRIDGE_PORT } = declareEnvs(['HOMEBRIDGE_PORT']);

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    ip: `${_networkService.baseIp}:${HOMEBRIDGE_PORT}`,
  });
});

export { router as getHomebridgeDataRouter };
