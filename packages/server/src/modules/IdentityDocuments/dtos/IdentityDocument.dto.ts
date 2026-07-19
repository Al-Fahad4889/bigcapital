import {
  IsString, IsInt, IsOptional, IsNotEmpty, IsDateString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIdentityDocumentDto {
  @IsInt()
  @IsNotEmpty()
  ownerId: number;

  @IsString()
  @IsNotEmpty()
  ownerType: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{5,20}$/, { message: 'documentNumber must be 5-20 alphanumeric characters' })
  documentNumber!: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsString()
  issuingCountry?: string;

  @IsOptional()
  @IsString()
  issuingAuthority?: string;

  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}

export class EditIdentityDocumentDto {
  @IsOptional()
  @IsInt()
  ownerId?: number;

  @IsOptional()
  @IsString()
  ownerType?: string;

  @IsOptional()
  @IsString()
  type?: string;

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
  @IsString()
  issuingAuthority?: string;

  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}