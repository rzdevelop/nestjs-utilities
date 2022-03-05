import { PrimaryGeneratedColumn } from 'typeorm';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedIntBaseEntity extends AuditBaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
