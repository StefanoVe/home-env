import express from 'express';
import { cameraRouter } from './camera';
import { debugRouter } from './debug';
import { pingRouter } from './get.ping';
import { homebridgeRouter } from './homebridge';

const router = express.Router();

router.use('/ping', pingRouter);
router.use('/camera', cameraRouter);
router.use('/debug', debugRouter);
router.use('/homebridge', homebridgeRouter);

export { router as apiRouter };
