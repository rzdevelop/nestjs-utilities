import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ITimestampBaseModel } from '../types';

export abstract class TimestampBaseEntity implements ITimestampBaseModel {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
