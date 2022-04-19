import { PrimaryGeneratedColumn } from 'typeorm';
import { IDetailedIntBaseEntity } from '../types';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedIntBaseEntity extends AuditBaseEntity implements IDetailedIntBaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
