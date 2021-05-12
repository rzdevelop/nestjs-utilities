import { DynamicModule, Module } from '@nestjs/common';
import {
  TerminusModule,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { HealthService } from './health.service';

@Module({})
export class HealthModule {
  static register({ enableTypeorm } = { enableTypeorm: false }): DynamicModule {
    const typeorm = enableTypeorm ? [TypeOrmHealthIndicator] : [];
    return {
      module: HealthModule,
      imports: [TerminusModule],
      providers: [
        {
          provide: HealthService,
          useFactory: (
            health: HealthCheckService,
            memory: MemoryHealthIndicator,
            db: TypeOrmHealthIndicator,
            http: HttpHealthIndicator,
          ) => new HealthService(health, memory, db, http, enableTypeorm),
          inject: [HealthCheckService, HttpHealthIndicator, ...typeorm, MemoryHealthIndicator],
        },
      ],
      exports: [HealthService],
    };
  }
}
