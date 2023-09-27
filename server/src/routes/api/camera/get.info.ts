import express from 'express';
import { getCameraPath } from '../../../services/service.camera';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    name: 'bambu_camera_01',
    location: 'LAB',
    resolution: '1080x1920',
    ip: getCameraPath(),
  });
});

export { router as cameraInfoRouter };
