import { Prisma } from '@prisma/client';

type AppEnvType = 'local' | 'develop' | 'production';

export const appEnv = (): AppEnvType => {
  return `${process.env.APP_ENV ?? 'local'}` as AppEnvType;
};

/**
 * Checks if the value is a database error.
 **/
export function isDatabaseError(
  value: unknown,
): value is Prisma.PrismaClientKnownRequestError {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (
    'code' in value &&
    'clientVersion' in value &&
    typeof (value as Prisma.PrismaClientKnownRequestError).code === 'string'
  ) {
    return true;
  }

  return false;
}
