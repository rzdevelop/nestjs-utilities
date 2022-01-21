import { DynamicModule, Module } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TerminusModule,
  TypeOrmHealthIndicator,
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
