import { PrimaryGeneratedColumn } from 'typeorm';

import { IdBaseModelInterface } from '../contracts';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedIntBaseEntity extends AuditBaseEntity implements IdBaseModelInterface<number> {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
