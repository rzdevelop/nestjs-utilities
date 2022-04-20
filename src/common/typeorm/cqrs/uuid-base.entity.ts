import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IIdBaseModel } from '../../types';

export abstract class UuidBaseEntity extends AggregateRoot implements IIdBaseModel<string> {
  constructor() {
    super();
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
