import { IQuery } from '@nestjs/cqrs';

export abstract class BaseExecutedByQuery implements IQuery {
  constructor(public readonly executedBy: string) {}
}
