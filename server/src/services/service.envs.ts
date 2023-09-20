import { RequiredEnvVariableError } from './errors';

export const declareEnvs = (envs: string[]) => {
  envs.forEach((name) => {
    if (!Bun.env[name]) {
      throw new RequiredEnvVariableError(name);
    }
  });

  return Bun.env as unknown as { [key: string]: string };
};
