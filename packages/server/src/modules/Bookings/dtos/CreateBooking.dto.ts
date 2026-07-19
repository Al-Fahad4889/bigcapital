import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { BookingStatus } from '../Bookings.types';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  customerId!: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: string;

  @IsOptional()
  @IsDateString()
  travelDateFrom?: string;

  @IsOptional()
  @IsDateString()
  travelDateTo?: string;

  @IsOptional()
  @IsInt()
  agentId?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  passengerIds?: number[];

  @IsOptional()
  @IsString()
  notes?: string;
}