import axios from 'axios';
import { _networkService } from '..';
import { declareEnvs } from './service.envs';

const { CAMERA_URL, CAMERA_PUBLIC_PORT } = declareEnvs([
  'CAMERA_URL',
  'CAMERA_PUBLIC_PORT',
]);

export const getCameraFeed = async () => {
  const request = await axios
    .get(CAMERA_URL, { responseType: 'arraybuffer', timeout: 5000 })

  return request.data;
};

export const getCameraPath = () => {
  const path = CAMERA_URL.split('/')[3];

  const cPort = CAMERA_PUBLIC_PORT;

  return `http://${_networkService.baseIp}${cPort ? ':' + cPort : ''}/${path}`;
};
