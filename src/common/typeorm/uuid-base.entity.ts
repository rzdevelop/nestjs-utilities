import { PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { IdBaseModelInterface } from '../contracts';

export abstract class UuidBaseEntity implements IdBaseModelInterface<string> {
  constructor(id?: string) {
    this.id = id ?? uuidv4();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
