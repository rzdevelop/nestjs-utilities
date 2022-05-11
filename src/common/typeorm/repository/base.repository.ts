import { PinoLogger } from 'nestjs-pino';
import { FindOneOptions, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

export interface GetOptions<TModel> {
  where?: FindOptionsWhere<TModel>;
  relations?: string[];
  order?: FindOptionsOrder<TModel>;
}

export interface BaseRepositoryInterface<TId extends string | number, TModelInterface, TEntity = TModelInterface> {
  create(model: TModelInterface): Promise<TModelInterface>;
  update(id: TId, model: TModelInterface): Promise<void>;
  remove(id: TId): Promise<void>;

  getByIdOrFail(id: TId): Promise<TModelInterface>;
  getById(id: TId): Promise<TModelInterface | null>;

  getByOrFail<TKey extends keyof TModelInterface>(
    property: TKey,
    value: TModelInterface[TKey],
  ): Promise<TModelInterface | null>;
  getBy<TKey extends keyof TModelInterface>(
    property: TKey,
    value: TModelInterface[TKey],
  ): Promise<TModelInterface | null>;

  findOne(options: FindOneOptions<TEntity>): Promise<TModelInterface | null>;

  getAll(options?: GetOptions<TModelInterface>): Promise<TModelInterface[]>;
}

export abstract class BaseRepository<TId extends string | number, TModelInterface, TEntity extends TModelInterface>
  implements BaseRepositoryInterface<TId, TModelInterface, TEntity>
{
  constructor(
    loggerContext: string,
    protected readonly logger: PinoLogger,
    protected readonly repository: Repository<TEntity>,
  ) {
    this.logger.setContext(loggerContext);
  }

  findOne(options: FindOneOptions<TEntity>): Promise<TModelInterface | null> {
    return this.repository.findOne(options);
  }

  abstract getByIdOrFail(id: TId): Promise<TModelInterface>;

  abstract getById(id: TId): Promise<TModelInterface | null>;

  abstract getByOrFail<TKey extends keyof TModelInterface>(
    property: TKey,
    value: TModelInterface[TKey],
  ): Promise<TModelInterface>;

  abstract getBy<TKey extends keyof TModelInterface>(
    property: TKey,
    value: TModelInterface[TKey],
  ): Promise<TModelInterface>;

  abstract getAll(options?: GetOptions<TModelInterface>): Promise<TModelInterface[]>;

  protected abstract _fromModel(model: TModelInterface): TEntity;

  create(model: TModelInterface): Promise<TModelInterface> {
    const entity = this._fromModel(model);

    return this.repository.save(entity);
  }

  async update(id: TId, model: TModelInterface): Promise<void> {
    const entity = this._fromModel(model);

    await this.repository.update(id, entity);
  }

  async remove(id: TId): Promise<void> {
    await this.repository.delete(id);
  }
}
