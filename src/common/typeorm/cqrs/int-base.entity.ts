import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryGeneratedColumn } from 'typeorm';
import { IIntBaseEntity } from '../../types';

export abstract class IntBaseEntity extends AggregateRoot implements IIntBaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;
}
