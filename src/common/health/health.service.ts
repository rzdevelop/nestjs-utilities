import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  HealthIndicatorFunction,
  HealthCheckResult,
  HealthIndicatorResult,
} from '@nestjs/terminus';

export interface HealthCheckOptions {
  checks?: { typeorm?: boolean };
  healthIndicators?: HealthIndicatorFunction[];
}

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly enableTypeorm: boolean,
  ) {}

  healthCheck(
    options: HealthCheckOptions = { checks: { typeorm: false }, healthIndicators: [] as HealthIndicatorFunction[] },
  ): Promise<HealthCheckResult> {
    const healthIndicators: HealthIndicatorFunction[] = [
      async (): Promise<HealthIndicatorResult> => this.memory.checkHeap('memory_heap', 3000 * 1024 * 1024),
      async (): Promise<HealthIndicatorResult> => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async (): Promise<HealthIndicatorResult> => this.http.pingCheck('google', 'https://google.com'),
      ...(options.healthIndicators || []),
    ];

    if (this.enableTypeorm && options.checks?.typeorm) {
      healthIndicators.push(async () => await this.db.pingCheck('db', { timeout: 60000 }));
    }

    return this.health.check(healthIndicators);
  }
}
