import { randomUUID } from 'crypto';
import { PrimaryColumn } from 'typeorm';

import { IdBaseModelInterface } from '../contracts';

export abstract class UuidBaseEntity implements IdBaseModelInterface<string> {
  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
