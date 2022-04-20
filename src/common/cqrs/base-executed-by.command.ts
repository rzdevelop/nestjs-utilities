import { ICommand } from '@nestjs/cqrs';

export abstract class BaseExecutedByCommand implements ICommand {
  constructor(public readonly executedBy: string) {}
}
