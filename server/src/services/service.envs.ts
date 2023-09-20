import { RequiredEnvVariableError } from './errors';

export const declareEnvs = (envs: string[]) => {
  envs.forEach((name) => {
    if (!process.env[name]) {
      throw new RequiredEnvVariableError(name);
    }
  });

  return process.env as unknown as { [key: string]: string };
};
