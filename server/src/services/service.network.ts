import axios from 'axios';
import { log } from '../../../utils/service.logs';

export const getCurrentIP = async () => {
  const currentIpRequest = await axios
    .get<{ ip: string }>('https://api.ipify.org?format=json')
    .catch((err) => {
      log(`[!] Failed to get current IP: ${err.message}`, 'error');
      return {
        data: {
          ip: 'UNAVAILABLE',
        },
      };
    });

  return currentIpRequest.data.ip;
};
