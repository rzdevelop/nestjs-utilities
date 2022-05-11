import { PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DetailedBaseModelInterface } from '../contracts';
import { AuditBaseEntity } from './audit-base.entity';

export abstract class DetailedUuidBaseEntity extends AuditBaseEntity implements DetailedBaseModelInterface<string> {
  constructor(id?: string) {
    super();
    this.id = id ?? uuidv4();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
