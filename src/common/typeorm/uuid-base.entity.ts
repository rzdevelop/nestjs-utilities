import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IUuidBaseEntity } from '../types';

export abstract class UuidBaseEntity implements IUuidBaseEntity {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
