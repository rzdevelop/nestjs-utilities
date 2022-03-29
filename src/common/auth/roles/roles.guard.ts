import { Request } from 'express';
import { PinoLogger } from 'nestjs-pino';

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from './roles.decorator';

export abstract class RolesGuard<RoleType, AuthUser> implements CanActivate {
  constructor(private reflector: Reflector, private readonly logger: PinoLogger) {
    this.logger.setContext(RolesGuard.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateRole(role: RoleType, request?: Request & { user: AuthUser }): Promise<boolean> | boolean {
    throw new Error('Method not implemented.');
  }

  validateRoles(requiredRoles: RoleType[], request: Request & { user: AuthUser }): Promise<boolean> | boolean {
    return requiredRoles.some((role) => this.validateRole(role, request));
  }

  protected getRequiresRoles(context: ExecutionContext): RoleType[] {
    return this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const requiredRoles = this.getRequiresRoles(context);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request & { user: AuthUser }>();
    this.logger.debug({ user: req.user, requiredRoles });

    return this.validateRoles(requiredRoles, req);
  }
}
