import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IUuidBaseEntity } from '../../types';

export abstract class UuidBaseEntity extends AggregateRoot implements IUuidBaseEntity {
  constructor() {
    super();
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
