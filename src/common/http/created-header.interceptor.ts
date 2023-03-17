import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
