import { Request } from 'express';
import { map } from 'rxjs/operators';

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreatedInterceptor<T = unknown, R = unknown> implements NestInterceptor<T, R> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<R> | Promise<Observable<R>> {
    return next.handle().pipe(
      map((data: T) => {
        const req = context.switchToHttp().getRequest<Request>();
        if (req.res?.statusCode === HttpStatus.CREATED && typeof data === 'string') {
          req.res.header('location', data);
        }
        return data as unknown as R;
      }),
    );
  }
}
