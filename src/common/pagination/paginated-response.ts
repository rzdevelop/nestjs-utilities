import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

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
