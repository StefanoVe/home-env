import axios from 'axios';
import { wLog } from './service.logs';

export const getCurrentIP = async () => {
  const currentIpRequest = await axios
    .get<{ ip: string }>('https://api.ipify.org?format=json')
    .catch((err) => {
      wLog(`[!] Failed to get current IP: ${err.message}`, 'error');
      return {
        data: {
          ip: 'UNAVAILABLE',
        },
      };
    });

  return currentIpRequest.data.ip;
};
