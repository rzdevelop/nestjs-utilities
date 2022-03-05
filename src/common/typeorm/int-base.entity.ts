import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class IntBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
