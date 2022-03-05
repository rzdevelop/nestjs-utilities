import { AggregateRoot } from '@nestjs/cqrs';
import { Column } from 'typeorm';

export abstract class ModifiersBaseEntity extends AggregateRoot {
  constructor() {
    super();
  }

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  createdBy: string;

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  updatedBy: string;
}
