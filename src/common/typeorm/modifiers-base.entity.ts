import { Column } from 'typeorm';

import { ModifiersBaseModelInterface } from '../contracts';

export abstract class ModifiersBaseEntity implements ModifiersBaseModelInterface {
  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_CREATED_BY' })
  createdBy: string;

  @Column({ type: 'varchar', length: '255', default: 'DEFAULT_UPDATED_BY' })
  updatedBy: string;
}
