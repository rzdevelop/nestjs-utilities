import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IDetailedBaseModel } from '../../types';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedUuidBaseEntity extends AuditBaseEntity implements IDetailedBaseModel<string> {
  constructor() {
    super();
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
