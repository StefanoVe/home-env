import express from 'express';
import { instance, main } from '../entry';

const router = express.Router();

router.post('/', async (req, res) => {
  if (req.query.AUTH !== Bun.env.PROXY_AUTH) {
    throw new Error('invalid auth!');
  }

  const _target = req.body.ip;

  console.log('target updated to ', _target);

  instance?.close(() => {
    console.log('instance closed, starting duplicate');
    instance?.closeAllConnections();
    main(_target);
  });

  res.send({ status: 'success' });
});

export { router as postTargetRouter };
