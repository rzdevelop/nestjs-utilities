import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryGeneratedColumn } from 'typeorm';
import { IIdBaseModel } from '../../types';

export abstract class IntBaseEntity extends AggregateRoot implements IIdBaseModel<number> {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
