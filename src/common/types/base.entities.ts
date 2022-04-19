export interface IModifiersBaseEntity {
  createdBy: string;
  updatedBy: string;
}

export interface ITimestampBaseEntity {
  createdAt: Date;
  updatedAt: Date;
}

export interface IIntBaseEntity {
  id: number;
}

export interface IUuidBaseEntity {
  id: string;
}

export interface IAuditBaseEntity extends IModifiersBaseEntity, ITimestampBaseEntity {}

export interface IDetailedIntBaseEntity extends IAuditBaseEntity, IIntBaseEntity {}

export interface IDetailedUuidBaseEntity extends IAuditBaseEntity, IUuidBaseEntity {}
