import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthService } from './health.service';

@Module({})
export class HealthModule {
  register(): DynamicModule {
    return {
      module: HealthModule,
      imports: [TerminusModule],
      providers: [HealthService],
      exports: [HealthService],
    };
  }
}
