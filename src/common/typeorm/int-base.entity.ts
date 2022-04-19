import { PrimaryGeneratedColumn } from 'typeorm';
import { IIntBaseEntity } from '../types';

export abstract class IntBaseEntity implements IIntBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
