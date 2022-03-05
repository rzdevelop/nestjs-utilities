import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';

export abstract class TimestampBaseEntity extends AggregateRoot {
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
