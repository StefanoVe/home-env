import axios from 'axios';

export const getCurrentIP = async () => {
  const currentIpRequest = await axios.get<{ ip: string }>(
    'https://api.ipify.org?format=json'
  );

  return currentIpRequest.data.ip;
};
