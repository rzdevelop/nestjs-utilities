import { Request } from 'express';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UnknownObject } from '../types';

type ReturnType = (...dataOrPipes: unknown[]) => ParameterDecorator;

export const BuildAuthUsrDecorator = <AuthUserType = UnknownObject>(): ReturnType =>
  createParamDecorator<unknown, ExecutionContext, AuthUserType>((data: unknown, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const request = http.getRequest<Request & { user: AuthUserType }>();

    return request.user;
  });
