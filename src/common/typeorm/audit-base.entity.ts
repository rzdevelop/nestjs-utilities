import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IAuditBaseModel } from '../types';

export abstract class AuditBaseEntity implements IAuditBaseModel {
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
