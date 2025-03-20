import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateBookingDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsISO8601()
  @IsOptional()
  startTime?: string;

  @IsISO8601()
  @IsOptional()
  endTime?: string;
}
