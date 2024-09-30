type AppEnvType = 'local' | 'develop' | 'production';

export const appEnv = (): AppEnvType => {
  return `${process.env.APP_ENV ?? 'local'}` as AppEnvType;
};
