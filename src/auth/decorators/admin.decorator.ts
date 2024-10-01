import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin.guard';

export function Admin() {
  return applyDecorators(UseGuards(AdminGuard));
}
