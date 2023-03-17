import { randomUUID } from 'crypto';
import { PrimaryColumn } from 'typeorm';

import { DetailedBaseModelInterface } from '../contracts';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedUuidBaseEntity extends AuditBaseEntity implements DetailedBaseModelInterface<string> {
  constructor(id?: string) {
    super();
    this.id = id ?? randomUUID();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
