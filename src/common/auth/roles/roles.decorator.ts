import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AllowedRoles = <Role>(...roles: Role[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
