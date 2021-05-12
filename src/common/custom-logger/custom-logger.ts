import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends Logger {
  constructor() {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message: string, data: Record<any, any>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(data: Record<any, any>): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(param1: string | Record<any, any>, data?: Record<any, any>): void {
    const hasMessage = typeof param1 === 'string';
    let str = hasMessage ? param1 + ' ' : '';
    try {
      str += JSON.stringify(hasMessage ? data : param1, undefined, 2);
    } catch (error) {
      this.error(`Error serializing data. ${error.message}`, 'CustomLogger.info, JSON.stringify');
    }

    this.log(str);
  }
}
