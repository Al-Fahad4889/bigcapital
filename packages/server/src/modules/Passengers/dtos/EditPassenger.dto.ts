import {
  IsString, IsOptional, IsDateString, IsEnum, Matches, IsInt,
} from 'class-validator';
import { VisaStatus } from '../Passengers.types';

export class EditPassengerDto {
  @IsOptional()
  @IsEnum(VisaStatus)
  visaStatus?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9]{5,20}$/, { message: 'documentNumber must be 5-20 alphanumeric characters' })
  documentNumber?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  issuingCountry?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsInt()
  bookingId?: number;
}