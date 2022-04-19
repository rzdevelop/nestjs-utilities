import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IDetailedUuidBaseEntity } from '../types';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedUuidBaseEntity extends AuditBaseEntity implements IDetailedUuidBaseEntity {
  constructor() {
    super();
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
