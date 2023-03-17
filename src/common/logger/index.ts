import { randomUUID } from 'crypto';

export const genReqId = (): string => randomUUID();

export const timestampFn = (): string => {
  const now = Date.now();
  const ts = new Date(now).toISOString();
  return `,"time":"${ts}","now":${now}`;
};
