import { PinoLogger } from 'nestjs-pino';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export interface BaseRepositoryInterface<
  TId extends string | number,
  TModelInterface extends { id: TId },
  TEntity extends TModelInterface = TModelInterface,
> {
  save(model: TModelInterface): Promise<TModelInterface>;
  remove(id: TId): Promise<void>;

  findOne(options?: FindOneOptions<TEntity>): Promise<TModelInterface | null>;
  findOneOrFail(options?: FindOneOptions<TEntity>): Promise<TModelInterface>;

  findById(id: TId, options?: FindOneOptions<TEntity>): Promise<TModelInterface | null>;
  findByIdOrFail(id: TId, options?: FindOneOptions<TEntity>): Promise<TModelInterface>;

  find(options?: FindManyOptions<TEntity>): Promise<TModelInterface[]>;
  findAndCount(options?: FindManyOptions<TEntity>): Promise<[TModelInterface[], number]>;
}

export abstract class BaseRepository<
  TId extends string | number,
  TModelInterface extends { id: TId },
  TEntity extends TModelInterface = TModelInterface,
> implements BaseRepositoryInterface<TId, TModelInterface, TEntity>
{
  constructor(
    loggerContext: string,
    protected readonly logger: PinoLogger,
    protected readonly repository: Repository<TEntity>,
  ) {
    this.logger.setContext(loggerContext);
  }

  find(options?: FindManyOptions<TEntity>): Promise<TModelInterface[]> {
    return this.repository.find(options);
  }

  findAndCount(options?: FindManyOptions<TEntity>): Promise<[TModelInterface[], number]> {
    return this.repository.findAndCount(options);
  }

  findById(id: TId, options: FindOneOptions<TEntity> = { where: {} }): Promise<TModelInterface | null> {
    return this.findOne({
      ...options,
      // @ts-expect-error This is an expected TS error since is not able to get the id type since TId can only be string or number
      where: {
        ...options.where,
        id,
      },
    });
  }

  findByIdOrFail(id: TId, options: FindOneOptions<TEntity> = { where: {} }): Promise<TModelInterface> {
    return this.findOneOrFail({
      ...options,
      // @ts-expect-error This is an expected TS error since is not able to get the id type since TId can only be string or number
      where: {
        ...options.where,
        id,
      },
    });
  }

  findOne(options: FindOneOptions<TEntity>): Promise<TModelInterface | null> {
    return this.repository.findOne(options);
  }

  findOneOrFail(options: FindOneOptions<TEntity>): Promise<TModelInterface> {
    return this.repository.findOneOrFail(options);
  }

  protected abstract _fromModel(model: TModelInterface): TEntity;

  save(model: TModelInterface): Promise<TModelInterface> {
    const entity = this._fromModel(model);

    return this.repository.save(entity);
  }

  async remove(id: TId): Promise<void> {
    await this.repository.delete(id);
  }
}
