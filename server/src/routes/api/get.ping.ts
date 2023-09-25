//boilerplate for an express route
import express from 'express';
import { _networkService, _uptimeService, currentVersion } from '../..';
import { declareEnvs } from '../../services/service.envs';

const { MOTD } = declareEnvs(['MOTD']);

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    success: true,
    motd: MOTD,
    uptime: _uptimeService.get,
    ip: _networkService.ip,
    version: currentVersion,
  });
});

export { router as pingRouter };
