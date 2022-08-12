import { PinoLogger } from 'nestjs-pino';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export interface BaseRepositoryInterface<
  TId extends string | number,
  TModelInterface extends { id: TId },
  TEntity extends TModelInterface = TModelInterface,
> {
  create(model: TModelInterface): Promise<TModelInterface>;
  update(id: TId, model: TModelInterface): Promise<void>;
  remove(id: TId): Promise<void>;

  findOne(options?: FindOneOptions<TEntity>): Promise<TModelInterface | null>;
  findOneOrFail(options?: FindOneOptions<TEntity>): Promise<TModelInterface>;

  getById(id: TId, options?: FindOneOptions<TEntity>): Promise<TModelInterface | null>;
  getByIdOrFail(id: TId, options?: FindOneOptions<TEntity>): Promise<TModelInterface>;

  getAll(options?: FindManyOptions<TEntity>): Promise<TModelInterface[]>;
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

  getAll(options?: FindManyOptions<TEntity>): Promise<TModelInterface[]> {
    return this.repository.find(options);
  }

  getById(id: TId, options: FindOneOptions<TEntity> = { where: {} }): Promise<TModelInterface | null> {
    return this.findOne({
      ...options,
      // @ts-expect-error This is an expected TS error since is not able to get the id type since TId can only be string or number
      where: {
        ...options.where,
        id,
      },
    });
  }
  getByIdOrFail(id: TId, options: FindOneOptions<TEntity> = { where: {} }): Promise<TModelInterface> {
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

  create(model: TModelInterface): Promise<TModelInterface> {
    const entity = this._fromModel(model);

    return this.repository.save(entity);
  }

  async update(id: TId, model: TModelInterface): Promise<void> {
    const entity = this._fromModel(model);

    // @ts-expect-error This is an expected TS error since is not able to get the id type since TId can only be string or number
    await this.repository.update(id, entity);
  }

  async remove(id: TId): Promise<void> {
    await this.repository.delete(id);
  }
}
