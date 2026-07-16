import { IsString, IsInt, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTravelServiceTypeDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsInt()
  taxRateId?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class EditTravelServiceTypeDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsInt()
  taxRateId?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}