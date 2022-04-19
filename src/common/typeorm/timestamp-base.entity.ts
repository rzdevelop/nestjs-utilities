import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ITimestampBaseEntity } from '../types';

export abstract class TimestampBaseEntity implements ITimestampBaseEntity {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
