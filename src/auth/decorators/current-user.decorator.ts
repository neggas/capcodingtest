import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator<void, ExecutionContext, User>(
  (_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User | null;

    if (!user) throw new ForbiddenException();

    return user;
  },
);
