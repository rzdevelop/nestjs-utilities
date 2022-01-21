import { PinoLogger } from 'nestjs-pino';
import { DeleteResult, FindConditions, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';

import { PaginatedResponse } from '../pagination/paginated-response';

export class BaseService<TEntity, TRepository extends Repository<TEntity>> {
  constructor(
    protected readonly logger: PinoLogger,
    protected readonly repository: TRepository,
    loggerContext: string,
  ) {
    this.logger.setContext(loggerContext);
  }

  create(entity: TEntity): Promise<TEntity> {
    return this.repository.save(entity);
  }

  findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return this.repository.find(options);
  }

  findAllAndCount(options?: FindManyOptions<TEntity>): Promise<[TEntity[], number]> {
    return this.repository.findAndCount(options);
  }

  async findAllPaginated(
    currentPage: number,
    take: number,
    options?: FindManyOptions<TEntity>,
  ): Promise<PaginatedResponse<TEntity>> {
    const [data, count] = await this.findAllAndCount({
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

  findOne(paramOne: string | FindConditions<TEntity>, options?: FindOneOptions<TEntity>): Promise<TEntity | undefined> {
    if (typeof paramOne === 'string') {
      return this.repository.findOne(paramOne, options);
    }
    return this.repository.findOne(paramOne, options);
  }

  findOneOrFail(options?: FindOneOptions<TEntity>): Promise<TEntity> {
    return this.repository.findOneOrFail(options);
  }

  findById(id: string, options?: FindOneOptions<TEntity>): Promise<TEntity> {
    return this.repository.findOneOrFail(id, options);
  }

  update(id: string, entity: TEntity): Promise<UpdateResult> {
    return this.repository.update(id, entity);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
