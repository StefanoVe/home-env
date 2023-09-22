//boilerplate express route
import { Router } from 'express';
import { logsManager } from '../../../services/service.logs';

const router = Router();

router.get('/', (req, res) => {
  res.send(
    logsManager.logs.filter((log: string) => !log.includes('/api/debug/logs'))
  );
});

export { router as logsRouter };
