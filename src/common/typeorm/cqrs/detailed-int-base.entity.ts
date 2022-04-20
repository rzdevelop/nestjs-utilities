import { PrimaryGeneratedColumn } from 'typeorm';
import { IDetailedBaseModel } from '../../types';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedIntBaseEntity extends AuditBaseEntity implements IDetailedBaseModel<number> {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
