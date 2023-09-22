//boilerplate for an express route
import express from 'express';
import { _uptimeService, currentIP, currentVersion } from '../..';
import { declareEnvs } from '../../services/service.envs';

const { MOTD } = declareEnvs(['MOTD']);

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    success: true,
    motd: MOTD,
    uptime: _uptimeService.get,
    ip: currentIP,
    version: currentVersion,
  });
});

export { router as pingRouter };
