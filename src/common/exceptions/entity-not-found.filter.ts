import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.NOT_FOUND;

    response.status(statusCode).json({
      statusCode,
      name: exception.name,
      message: exception.message,
    });
  }
}

export const NotFoundHandler = (e: Error): never => {
  if (e.message === 'NotFound') {
    throw new NotFoundException();
  }
  throw new InternalServerErrorException();
};
