import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class IntBaseEntity extends AggregateRoot {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
