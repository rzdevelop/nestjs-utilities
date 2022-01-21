import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { PinoLogger } from 'nestjs-pino';

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from './roles.decorator';

export abstract class RolesGuard<RoleType, AuthUser> implements CanActivate {
  constructor(private reflector: Reflector, private readonly logger: PinoLogger) {
    this.logger.setContext(RolesGuard.name);
  }

  abstract validateRole(role: RoleType, extra?: { params: ParamsDictionary }): boolean;

  protected getRequiresRoles(context: ExecutionContext): RoleType[] {
    return this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.getRequiresRoles(context);

    if (!requiredRoles) {
      return true;
    }

    const { user, params } = context.switchToHttp().getRequest<Request & { user: AuthUser }>();
    this.logger.debug({ user, requiredRoles });

    return requiredRoles.some((role) => this.validateRole(role, { params }));
  }
}
