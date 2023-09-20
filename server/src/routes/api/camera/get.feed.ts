//boilerplate for an express route
import express from 'express';
import { getCameraFeed } from '../../../services/service.camera';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getCameraFeed();

  res.type('image/jpg');
  res.send(result);
});

export { router as feedRouter };
