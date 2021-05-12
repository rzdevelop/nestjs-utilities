import { Request } from 'express';
import { map } from 'rxjs/operators';

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class CreatedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest<Request>();
        if (req.res?.statusCode === HttpStatus.CREATED && typeof data === 'string') {
          req.res.header('location', data);
        }
        return data;
      }),
    );
  }
}
