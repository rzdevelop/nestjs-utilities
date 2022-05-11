import { PrimaryGeneratedColumn } from 'typeorm';

import { IdBaseModelInterface } from '../contracts';

export abstract class IntBaseEntity implements IdBaseModelInterface<number> {
  @PrimaryGeneratedColumn()
  id: number;
}
