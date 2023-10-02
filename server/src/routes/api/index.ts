import express from 'express';
import { cameraRouter } from './camera';
import { debugRouter } from './debug';
import { pingRouter } from './get.ping';

const router = express.Router();

router.use('/ping', pingRouter);
router.use('/camera', cameraRouter);
router.use('/debug', debugRouter);

export { router as apiRouter };
