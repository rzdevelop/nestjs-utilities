import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export abstract class UuidBaseEntity extends AggregateRoot {
  constructor() {
    super();
    this.id = uuid();
  }

  @PrimaryColumn({ type: 'text' })
  id: string;
}
