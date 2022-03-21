import { AggregateRoot } from '@nestjs/cqrs';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditBaseEntity extends AggregateRoot {
  constructor() {
    super();
  }

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  createdBy: string;

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  updatedBy: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}