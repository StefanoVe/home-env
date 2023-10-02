import express from 'express';
import { getHomebridgeDataRouter } from './get';

const router = express.Router();

router.use('/', getHomebridgeDataRouter);

export { router as homebridgeRouter };
