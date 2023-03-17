import { IQuery } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

import { BaseCqrsMetadata } from './base.metadata';

export interface BaseQueryInterface extends IQuery, BaseCqrsMetadata {
  id: string;
}

export type BaseQueryMetadata = BaseCqrsMetadata;

export abstract class BaseQuery implements BaseQueryInterface {
  id: string;
  correlationId: string;
  causationId: string;
  executedBy: string;

  constructor(metadata: BaseQueryMetadata) {
    this.id = randomUUID();
    this.correlationId = metadata.correlationId;
    this.causationId = metadata.causationId;
    this.executedBy = metadata.executedBy;
  }
}
