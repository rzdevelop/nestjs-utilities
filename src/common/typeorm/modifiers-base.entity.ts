import { Column } from 'typeorm';
import { IModifiersBaseEntity } from '../types';

export abstract class ModifiersBaseEntity implements IModifiersBaseEntity {
  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  createdBy: string;

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  updatedBy: string;
}
