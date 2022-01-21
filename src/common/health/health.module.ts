import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TerminusModule,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { HealthService } from './health.service';

export interface HealthModuleOptions {
  enableTypeorm: boolean;
  httpModuleOptions: HttpModuleOptions;
}

@Module({})
export class HealthModule {
  static register(
    { enableTypeorm, httpModuleOptions } = {
      enableTypeorm: false,
    } as HealthModuleOptions,
  ): DynamicModule {
    const typeorm = enableTypeorm ? [TypeOrmHealthIndicator] : [];
    return {
      module: HealthModule,
      imports: [TerminusModule, HttpModule.register(httpModuleOptions ?? {})],
      providers: [
        {
          provide: HealthService,
          useFactory: (
            health: HealthCheckService,
            memory: MemoryHealthIndicator,
            http: HttpHealthIndicator,
            db: TypeOrmHealthIndicator,
          ): HealthService => new HealthService(health, memory, http, db, enableTypeorm),
          inject: [HealthCheckService, MemoryHealthIndicator, HttpHealthIndicator, ...typeorm],
        },
      ],
      exports: [HealthService],
    };
  }
}
