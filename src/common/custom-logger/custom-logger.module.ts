import { DynamicModule, Module } from '@nestjs/common';
import { CustomLogger } from './custom-logger';

@Module({})
export class CustomLoggerModule {
  static register(): DynamicModule {
    return {
      module: CustomLoggerModule,
      providers: [CustomLogger],
      exports: [CustomLogger],
    };
  }
}
