import { applyDecorators } from '@nestjs/common';

export type UnknownObject<Type = unknown, Key extends string | number | symbol = string> = Record<Key, Type>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassType<T> = { new (...params: any[]): T };

export type DecoratorReturnType = ReturnType<typeof applyDecorators>;
