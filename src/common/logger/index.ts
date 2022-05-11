import { v4 as uuidv4 } from 'uuid';

export const genReqId = (): string => uuidv4();

export const timestampFn = (): string => {
  const now = Date.now();
  const ts = new Date(now).toISOString();
  return `,"time":"${ts}","now":${now}`;
};
