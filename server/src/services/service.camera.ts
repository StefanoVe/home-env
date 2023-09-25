import axios from 'axios';
import { _networkService } from '..';
import { genericErrorHandler } from './errors';
import { declareEnvs } from './service.envs';

const { CAMERA_URL } = declareEnvs(['CAMERA_URL']);

export const getCameraFeed = async () => {
  const request = await axios
    .get(CAMERA_URL, { responseType: 'arraybuffer', timeout: 5000 })
    .catch(genericErrorHandler);

  return request.data;
};

export const getCameraPath = async () => {
  const path = CAMERA_URL.split('/')[3];

  const cPort = Bun.env.CAMERA_PUBLIC_PORT;

  return `http://${_networkService.ip}${cPort ? ':' + cPort : ''}/${path}`;
};
