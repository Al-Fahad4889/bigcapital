import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Passenger } from '../models/Passenger.model';
import { CreatePassengerDto } from '../dtos/CreatePassenger.dto';
import { CreateIdentityDocument } from '../../IdentityDocuments/commands/CreateIdentityDocument.service';
import { GetBooking } from '../../Bookings/queries/GetBooking.service';
import { ListBookings } from '../../Bookings/queries/ListBookings.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';
import { VisaStatus } from '../Passengers.types';

@Injectable()
export class CreatePassenger {
  constructor(
    @Inject(Passenger.name)
    private readonly passengerModel: TenantModelProxy<typeof Passenger>,
    private readonly createIdentityDocument: CreateIdentityDocument,
    private readonly getBooking: GetBooking,
    private readonly listBookings: ListBookings,
  ) {}

  async create(dto: CreatePassengerDto) {
    const warnings: string[] = [];

    const dob = new Date(dto.dateOfBirth);
    if (dob >= new Date()) {
      throw new BadRequestException('Date of birth must be in the past.');
    }

    const expiry = new Date(dto.expiresAt);
    if (expiry <= new Date()) {
      throw new BadRequestException('Passport expiry date must be in the future.');
    }

    const passenger = await this.passengerModel()
      .query()
      .insertAndFetch({
        customerId: dto.customerId,
        visaStatus: dto.visaStatus ?? VisaStatus.NONE,
        notes: dto.notes,
      });

    await this.createIdentityDocument.create({
      ownerId: passenger.id,
      ownerType: 'passenger',
      type: 'passport',
      documentNumber: dto.documentNumber,
      fullName: dto.fullName,
      issuingCountry: dto.issuingCountry,
      dateOfBirth: dto.dateOfBirth,
      expiresAt: dto.expiresAt,
    });

    if (dto.bookingId) {
      const booking = await this.getBooking.get(dto.bookingId);
      this.checkTravelWindowWarning(warnings, expiry, booking.travelDateFrom, booking.travelDateTo);
    } else {
      // Standalone customer profile: warn if the passport expires during any
      // of the customer's upcoming bookings' travel windows.
      const upcoming = await this.listBookings.upcomingByCustomer(dto.customerId);
      for (const booking of upcoming) {
        this.checkTravelWindowWarning(warnings, expiry, booking.travelDateFrom, booking.travelDateTo);
      }
    }

    return { passenger, warnings };
  }

  private checkTravelWindowWarning(
    warnings: string[],
    expiry: Date,
    travelDateFrom?: string,
    travelDateTo?: string,
  ) {
    if (!travelDateFrom || !travelDateTo) return;
    const windowStart = new Date(travelDateFrom);
    const windowEnd = new Date(travelDateTo);
    if (expiry >= windowStart && expiry <= windowEnd) {
      warnings.push('Passport expires during the travel window.');
    }
  }
}
