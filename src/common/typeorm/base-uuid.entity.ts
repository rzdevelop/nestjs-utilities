import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { TimestampAggregateRootBaseEntity } from './timestamp-base.entity';

export abstract class BaseUuidEntity extends TimestampAggregateRootBaseEntity {
  constructor() {
    super();
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
