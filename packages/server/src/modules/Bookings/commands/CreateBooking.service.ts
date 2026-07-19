import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Booking } from '../models/Booking.model';
import { BookingPassenger } from '../models/BookingPassenger.model';
import { CreateBookingDto } from '../dtos/CreateBooking.dto';
import { events } from '@/common/events/events';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

function generateReference(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BKG-${ts}-${rand}`;
}

@Injectable()
export class CreateBooking {
  constructor(
    @Inject(Booking.name)
    private readonly bookingModel: TenantModelProxy<typeof Booking>,
    @Inject(BookingPassenger.name)
    private readonly bookingPassengerModel: TenantModelProxy<typeof BookingPassenger>,
    private readonly eventPublisher: EventEmitter2,
  ) {}

  async create(dto: CreateBookingDto) {
    const booking = await this.bookingModel()
      .query()
      .insertAndFetch({
        customerId: dto.customerId,
        bookingReference: generateReference(),
        status: dto.status ?? 'draft',
        travelDateFrom: dto.travelDateFrom,
        travelDateTo: dto.travelDateTo,
        agentId: dto.agentId,
        notes: dto.notes,
      });

    if (dto.passengerIds?.length) {
      await this.bookingPassengerModel()
        .query()
        .insert(dto.passengerIds.map((passengerId) => ({
          bookingId: booking.id,
          passengerId,
        })));
    }

    await this.eventPublisher.emitAsync(events.booking.onCreated, { booking });

    if (booking.status === 'confirmed') {
      await this.eventPublisher.emitAsync(events.booking.onConfirmed, { booking });
    }

    return booking;
  }
}