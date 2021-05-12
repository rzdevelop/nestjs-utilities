import { Request } from 'express';

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CustomLogger } from '../../custom-logger';
import { ROLES_KEY } from './roles.decorator';
import { ParamsDictionary } from 'express-serve-static-core';

export abstract class RolesGuard<RoleType, AuthUser> implements CanActivate {
  constructor(private reflector: Reflector, private readonly logger: CustomLogger) {
    this.logger.setContext(RolesGuard.name);
  }

  abstract validateRole(role: RoleType, extra?: { params: ParamsDictionary }): boolean;

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user, params } = context.switchToHttp().getRequest<Request & { user: AuthUser }>();
    this.logger.info(user);

    return requiredRoles.some((role) => this.validateRole(role, { params }));
  }
}
