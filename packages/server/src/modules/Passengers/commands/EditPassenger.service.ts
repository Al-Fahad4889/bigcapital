import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Passenger } from '../models/Passenger.model';
import { EditPassengerDto } from '../dtos/EditPassenger.dto';
import { EditIdentityDocument } from '../../IdentityDocuments/commands/EditIdentityDocument.service';
import { GetBooking } from '../../Bookings/queries/GetBooking.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class EditPassenger {
  constructor(
    @Inject(Passenger.name)
    private readonly passengerModel: TenantModelProxy<typeof Passenger>,
    private readonly editIdentityDocument: EditIdentityDocument,
    private readonly getBooking: GetBooking,
  ) {}

  async edit(id: number, dto: EditPassengerDto) {
    const warnings: string[] = [];

    if (dto.dateOfBirth) {
      const dob = new Date(dto.dateOfBirth);
      if (dob >= new Date()) {
        throw new BadRequestException('Date of birth must be in the past.');
      }
    }

    if (dto.expiresAt) {
      const expiry = new Date(dto.expiresAt);
      if (expiry <= new Date()) {
        throw new BadRequestException('Passport expiry date must be in the future.');
      }
    }

    const passenger = await this.passengerModel()
      .query()
      .patchAndFetchById(id, {
        visaStatus: dto.visaStatus,
        notes: dto.notes,
      });

    const identityDoc = await passenger.$relatedQuery('identityDocument') as any;

    const identityDocFields: any = {};
    if (dto.documentNumber !== undefined) identityDocFields.documentNumber = dto.documentNumber;
    if (dto.fullName !== undefined) identityDocFields.fullName = dto.fullName;
    if (dto.issuingCountry !== undefined) identityDocFields.issuingCountry = dto.issuingCountry;
    if (dto.dateOfBirth !== undefined) identityDocFields.dateOfBirth = dto.dateOfBirth;
    if (dto.expiresAt !== undefined) identityDocFields.expiresAt = dto.expiresAt;

    if (Object.keys(identityDocFields).length > 0 && identityDoc) {
      await this.editIdentityDocument.edit(identityDoc.id, identityDocFields);
    }

    if (dto.bookingId) {
      const booking = await this.getBooking.get(dto.bookingId);
      if (booking.travelDateFrom && booking.travelDateTo) {
        const expiry = new Date(dto.expiresAt ?? identityDoc?.expiresAt);
        if (!expiry) return { passenger, warnings };

        const windowStart = new Date(booking.travelDateFrom);
        const windowEnd = new Date(booking.travelDateTo);
        if (expiry >= windowStart && expiry <= windowEnd) {
          warnings.push('Passport expires during the travel window.');
        }
      }
    }

    return { passenger, warnings };
  }
}