import { NotImplementedException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DeepPartial, DeleteResult, FindManyOptions, ObjectLiteral, Repository, UpdateResult } from 'typeorm';

import { PaginatedResponse } from '../pagination/paginated-response';
import { UnknownObject } from '../types';

export interface IBaseService<
  TEntity,
  TId extends string | number = string,
  TGetAll = UnknownObject,
  TGetById = UnknownObject,
> {
  create(entity: DeepPartial<TEntity>): Promise<TEntity>;
  update(id: TId, entity: TEntity): Promise<UpdateResult>;
  remove(id: TId): Promise<DeleteResult>;
  findAllPaginated(
    currentPage: number,
    take: number,
    options?: FindManyOptions<TEntity>,
  ): Promise<PaginatedResponse<TEntity>>;
  getAll(options?: TGetAll): Promise<TEntity[]>;
  getById(options?: TGetById): Promise<TEntity | null>;
}

export abstract class BaseService<
  TEntity extends ObjectLiteral,
  TRepository extends Repository<TEntity>,
  TId extends string | number = string,
  TGetAll = UnknownObject,
  TGetById = UnknownObject,
> implements IBaseService<TEntity, TId, TGetAll, TGetById>
{
  constructor(
    protected readonly logger: PinoLogger,
    protected readonly repository: TRepository,
    loggerContext: string,
  ) {
    this.logger.setContext(loggerContext);
  }

  async create(entity: DeepPartial<TEntity>): Promise<TEntity> {
    return this.repository.save(entity);
  }

  async update(id: TId, entity: TEntity): Promise<UpdateResult> {
    return this.repository.update(id, entity);
  }

  async remove(id: TId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findAllPaginated(
    currentPage: number,
    take: number,
    options?: FindManyOptions<TEntity>,
  ): Promise<PaginatedResponse<TEntity>> {
    const [data, count] = await this.repository.findAndCount({
      ...(options || {}),
      take,
      skip: (currentPage - 1) * take,
    });
    const numberOfPages = Math.ceil(count / take);

    return {
      data,
      count,
      currentPage,
      perPage: take,
      numberOfPages,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAll(options?: TGetAll): Promise<TEntity[]> {
    throw new NotImplementedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById(options?: TGetById): Promise<TEntity> {
    throw new NotImplementedException();
  }
}
