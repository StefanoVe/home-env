import express from 'express';
import { feedRouter } from './get.feed';
import { cameraInfoRouter } from './get.info';

const router = express.Router();

router.use('/feed', feedRouter);
router.use('/info', cameraInfoRouter);

export { router as cameraRouter };
