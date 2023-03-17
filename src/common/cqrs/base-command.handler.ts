import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PinoLogger } from 'nestjs-pino';

export interface IBaseCommandHandler<TCommand extends ICommand, TResult> extends ICommandHandler<TCommand, TResult> {
  handle(command: TCommand): Promise<TResult>;
}

export abstract class BaseCommandHandler<TCommand extends ICommand, TResult>
  implements IBaseCommandHandler<TCommand, TResult>
{
  constructor(
    protected readonly logger: PinoLogger,
    protected readonly loggerContext: string,
    protected readonly commandName: string,
  ) {
    this.logger.setContext(loggerContext);
  }

  async execute(command: TCommand): Promise<TResult> {
    this.logger.debug(
      { command: { ...command, commandName: this.commandName } },
      `Executing command: ${this.commandName}`,
    );

    return this.handle(command);
  }

  abstract handle(command: TCommand): Promise<TResult>;
}
