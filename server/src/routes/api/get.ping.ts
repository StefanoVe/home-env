//boilerplate for an express route
import express from 'express';
import { _uptimeService, currentVersion } from '../..';
import { declareEnvs } from '../../services/service.envs';
import { getCurrentIP } from '../../services/service.network';

const { MOTD } = declareEnvs(['MOTD']);

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    success: true,
    motd: MOTD,
    uptime: _uptimeService.get,
    ip: await getCurrentIP(),
    version: currentVersion,
  });
});

export { router as pingRouter };
