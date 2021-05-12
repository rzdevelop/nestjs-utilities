import { PrimaryGeneratedColumn } from 'typeorm';

import { TimestampAggregateRootBaseEntity } from './timestamp-aggregate-root-base.entity';

export abstract class BaseIntEntity extends TimestampAggregateRootBaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
