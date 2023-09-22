//boilerplate express route
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send(Bun.env);
});

export { router as envRouter };
