import { PinoLogger } from 'nestjs-pino';

import { IQuery, IQueryHandler } from '@nestjs/cqrs';

export interface IBaseQueryHandler<TQuery extends IQuery, TResult> extends IQueryHandler<TQuery, TResult> {
  handle(query: TQuery): Promise<TResult>;
}

export abstract class BaseQueryHandler<TQuery extends IQuery, TResult> implements IBaseQueryHandler<TQuery, TResult> {
  constructor(
    protected readonly logger: PinoLogger,
    protected readonly loggerContext: string,
    protected readonly QueryName: string,
  ) {
    this.logger.setContext(loggerContext);
  }

  async execute(query: TQuery): Promise<TResult> {
    this.logger.debug({ query: { ...query, queryName: this.QueryName } }, `Executing query: ${this.QueryName}`);

    return this.handle(query);
  }

  abstract handle(query: TQuery): Promise<TResult>;
}
