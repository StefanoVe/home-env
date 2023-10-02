import express from 'express';
import { getCameraPath } from '../../../services/service.camera';


const {HOMEBRIDGE_PORT} = declareEnvs(['HOMEBRIDGE_PORT'])

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    ip: `${networkService.ip}:${HOMEBRIDGE_PORT}` 
  });
});

export { router as getHomebridgeDataRouter };
