import { IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  currentPage: number;
  numberOfPages: number;
  perPage: number;
}

export class PaginatedQuery {
  @ApiProperty({ required: false, type: String })
  @IsNumberString()
  @IsOptional()
  currentPage?: string;

  @ApiProperty({ required: false, type: String })
  @IsNumberString()
  @IsOptional()
  perPage?: string;
}
