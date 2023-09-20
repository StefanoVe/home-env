import express from 'express';
import { cameraRouter } from './camera';
import { pingRouter } from './get.ping';

const router = express.Router();

router.use('/ping', pingRouter);
router.use('/camera', cameraRouter);

export { router as apiRouter };
