//boilerplate for an express route
import express from 'express';
import { getCameraFeed } from '../../../services/service.camera';
import { BadRequestError } from '../../../services/errors';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getCameraFeed().catch((e) => new BadRequestError('feed unavailable'));

  res.type('image/jpg');
  res.send(result);
});

export { router as feedRouter };
