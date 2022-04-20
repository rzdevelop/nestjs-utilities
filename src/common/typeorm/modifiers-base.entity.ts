import { Column } from 'typeorm';
import { IModifiersBaseModel } from '../types';

export abstract class ModifiersBaseEntity implements IModifiersBaseModel {
  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  createdBy: string;

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  updatedBy: string;
}
