import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

export const genReqId = (req: Request, res: Response): string => {
  let id = req.get('X-Request-Id');

  if (id) return id;

  id = randomUUID();
  res.header('X-Request-Id', id);

  return id;
};

export const timestampFn = (): string => {
  const now = Date.now();
  const ts = new Date(now).toISOString();
  return `,"time":"${ts}","now":${now}`;
};
