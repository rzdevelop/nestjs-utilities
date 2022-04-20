export interface IModifiersBaseModel {
  createdBy: string;
  updatedBy: string;
}

export interface ITimestampBaseModel {
  createdAt: Date;
  updatedAt: Date;
}

export interface IIdBaseModel<T extends number | string> {
  id: T;
}

export interface IAuditBaseModel extends IModifiersBaseModel, ITimestampBaseModel {}

export interface IDetailedBaseModel<TId extends number | string> extends IAuditBaseModel, IIdBaseModel<TId> {}
