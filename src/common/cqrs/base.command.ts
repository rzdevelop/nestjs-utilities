import { ICommand } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

import { BaseCqrsMetadata } from './base.metadata';

export interface BaseCommandInterface extends ICommand, BaseCqrsMetadata {
  id: string;
}

export type BaseCommandMetadata = BaseCqrsMetadata;

export abstract class BaseCommand implements BaseCommandInterface {
  id: string;
  correlationId: string;
  causationId: string;
  executedBy: string;

  constructor(metadata: BaseCommandMetadata) {
    this.id = uuidv4();
    this.correlationId = metadata.correlationId;
    this.causationId = metadata.causationId;
    this.executedBy = metadata.executedBy;
  }
}
