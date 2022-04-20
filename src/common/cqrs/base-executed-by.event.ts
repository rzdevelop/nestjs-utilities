import { IEvent } from '@nestjs/cqrs';

export abstract class BaseExecutedByEvent implements IEvent {
  constructor(public readonly executedBy: string) {}
}
