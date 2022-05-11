export interface BaseCqrsMetadata {
  correlationId: string;
  causationId: string;
  executedBy: string;
}
