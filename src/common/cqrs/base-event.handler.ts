import { IEvent, IEventHandler } from '@nestjs/cqrs';
import { PinoLogger } from 'nestjs-pino';

export interface IBaseEventHandler<TEvent extends IEvent> extends IEventHandler<TEvent> {
  handleEvent(event: TEvent): Promise<void>;
}

export abstract class BaseEventHandler<TEvent extends IEvent> implements IBaseEventHandler<TEvent> {
  constructor(
    protected readonly logger: PinoLogger,
    protected readonly loggerContext: string,
    protected readonly eventName: string,
  ) {
    this.logger.setContext(loggerContext);
  }

  handle(event: TEvent): void | Promise<void> {
    this.logger.debug({ event: { ...event, eventName: this.eventName } }, `Handling event: ${this.eventName}`);

    return this.handleEvent(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleEvent(event: TEvent): Promise<void> {
    // Optional to be implemented optionally by children
    return Promise.resolve();
  }
}
