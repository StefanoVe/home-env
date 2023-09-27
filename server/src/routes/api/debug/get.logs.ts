//boilerplate express route
import { Router } from 'express';
import { logsManager } from '../../../services/service.logs';

const router = Router();

router.get('/', (req, res) => {
  res.send(logsManager.logs);
});

export { router as logsRouter };
