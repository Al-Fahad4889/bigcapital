import { Injectable, Inject } from '@nestjs/common';
import { Booking } from '../models/Booking.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { BookingTransformer } from './BookingTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class ListBookings {
  constructor(
    @Inject(Booking.name)
    private readonly bookingModel: TenantModelProxy<typeof Booking>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async list() {
    const bookings = await this.bookingModel().query();
    return this.transformer.transform(bookings, new BookingTransformer());
  }

  async upcomingByCustomer(customerId: number) {
    const today = new Date().toISOString().slice(0, 10);
    const bookings = await this.bookingModel()
      .query()
      .where('customerId', customerId)
      .where('travelDateFrom', '>=', today)
      .orderBy('travelDateFrom', 'asc');
    return bookings;
  }
}
