import { AggregateRoot } from '@nestjs/cqrs';
import { DetailedBaseModelInterface } from '../contracts';

export abstract class BaseModel<TId extends string | number>
  extends AggregateRoot
  implements DetailedBaseModelInterface<TId>
{
  constructor(id: TId, executedBy: string) {
    super();

    const now = new Date();

    this.id = id;
    this.createdBy = executedBy;
    this.updatedBy = executedBy;
    this.createdAt = now;
    this.updatedAt = now;
  }

  readonly createdBy: string;
  updatedBy: string;
  readonly createdAt: Date;
  updatedAt: Date;
  readonly id: TId;

  public applyUpdate(executedBy: string): void {
    this.updatedAt = new Date();
    this.updatedBy = executedBy;
  }

  protected _init(createdBy: string, updatedBy: string, createdAt: Date, updatedAt: Date): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
