import { IEvent } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import { BaseCqrsMetadata } from './base.metadata';

export interface BaseEventInterface extends IEvent, BaseCqrsMetadata {
  id: string;
}

export type BaseEventMetadata = BaseCqrsMetadata;

export abstract class BaseEvent implements BaseEventInterface {
  id: string;
  correlationId: string;
  causationId: string;
  executedBy: string;

  constructor(metadata: BaseEventMetadata) {
    this.id = uuidv4();
    this.correlationId = metadata.correlationId;
    this.causationId = metadata.causationId;
    this.executedBy = metadata.executedBy;
  }
}
