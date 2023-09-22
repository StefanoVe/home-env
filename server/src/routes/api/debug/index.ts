import { Router } from 'express';
import { envRouter } from './get.env';
import { logsRouter } from './get.logs';

const router = Router();

router.use('/logs', logsRouter);
router.use('/env', envRouter);

export { router as debugRouter };
