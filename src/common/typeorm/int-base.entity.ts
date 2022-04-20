import { PrimaryGeneratedColumn } from 'typeorm';
import { IIdBaseModel } from '../types';

export abstract class IntBaseEntity implements IIdBaseModel<number> {
  @PrimaryGeneratedColumn()
  id: number;
}
