import { Injectable, Inject, ConflictException, BadRequestException } from '@nestjs/common';
import { BookingPassenger } from '../models/BookingPassenger.model';
import { Booking } from '../models/Booking.model';
import { Passenger } from '../../Passengers/models/Passenger.model';
import { GetBooking } from '../queries/GetBooking.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class AttachPassengerToBooking {
  constructor(
    private readonly getBooking: GetBooking,
    @Inject(Passenger.name)
    private readonly passengerModel: TenantModelProxy<typeof Passenger>,
    @Inject(BookingPassenger.name)
    private readonly bookingPassengerModel: TenantModelProxy<typeof BookingPassenger>,
  ) {}

  async execute(bookingId: number, passengerId: number) {
    const warnings: string[] = [];
    const booking = await this.getBooking.get(bookingId);

    // Prevent duplicate attachment
    const existing = await this.bookingPassengerModel()
      .query()
      .where({ bookingId, passengerId })
      .first();

    if (existing) {
      throw new ConflictException('Passenger is already attached to this booking.');
    }

    await this.bookingPassengerModel().query().insert({ bookingId, passengerId });

    // Travel-window passport expiry check
    if (booking.travelDateFrom && booking.travelDateTo) {
    const passenger = await this.passengerModel()
      .query()
      .findById(passengerId)
      .withGraphFetched('identityDocument');

    if (!passenger) {
      throw new BadRequestException('Passenger not found.');
    }

    // Passengers must belong to the booking's customer to reuse verified data.
    if (passenger.customerId !== booking.customerId) {
      throw new BadRequestException(
        'Passenger does not belong to this booking’s customer.',
      );
    }

      const identityDoc: any = (passenger as any).identityDocument;
      if (identityDoc?.expiresAt) {
        const expiry = new Date(identityDoc.expiresAt);
        const windowStart = new Date(booking.travelDateFrom);
        const windowEnd = new Date(booking.travelDateTo);
        if (expiry >= windowStart && expiry <= windowEnd) {
          warnings.push('Passport expires during the travel window.');
        }
      }
    }

    return { bookingId, passengerId, warnings };
  }
}