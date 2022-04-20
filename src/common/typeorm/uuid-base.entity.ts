import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IIdBaseModel } from '../types';

export abstract class UuidBaseEntity implements IIdBaseModel<string> {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
