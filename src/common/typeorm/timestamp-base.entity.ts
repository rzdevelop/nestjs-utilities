import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { TimestampBaseModelInterface } from '../contracts';

export abstract class TimestampBaseEntity implements TimestampBaseModelInterface {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
