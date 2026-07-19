import {
  IsString, IsNotEmpty, IsOptional, IsDateString,
  IsEnum, Matches, IsInt,
} from 'class-validator';
import { VisaStatus } from '../Passengers.types';

export class CreatePassengerDto {
  @IsInt()
  @IsNotEmpty()
  customerId!: number;

  @IsEnum(VisaStatus)
  @IsOptional()
  visaStatus?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  // Passport fields — inlined for compound creation
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{5,20}$/, { message: 'documentNumber must be 5-20 alphanumeric characters' })
  documentNumber!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsOptional()
  issuingCountry?: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth!: string;

  @IsDateString()
  @IsNotEmpty()
  expiresAt!: string;

  @IsOptional()
  @IsInt()
  bookingId?: number;
}