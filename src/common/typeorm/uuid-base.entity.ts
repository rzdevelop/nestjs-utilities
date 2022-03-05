import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export abstract class UuidBaseEntity {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
