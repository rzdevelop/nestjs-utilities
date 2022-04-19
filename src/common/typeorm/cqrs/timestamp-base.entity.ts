import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';
import { ITimestampBaseEntity } from '../../types';

export abstract class TimestampBaseEntity extends AggregateRoot implements ITimestampBaseEntity {
  constructor() {
    super();
  }

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
