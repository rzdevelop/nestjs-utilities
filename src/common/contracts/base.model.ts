export interface ModifiersBaseModelInterface {
  createdBy: string;
  updatedBy: string;
}

export interface TimestampBaseModelInterface {
  createdAt: Date;
  updatedAt: Date;
}

export interface IdBaseModelInterface<T extends number | string> {
  id: T;
}

export interface AuditBaseModelInterface extends ModifiersBaseModelInterface, TimestampBaseModelInterface {}

export interface DetailedBaseModelInterface<TId extends number | string>
  extends AuditBaseModelInterface,
    IdBaseModelInterface<TId> {}
