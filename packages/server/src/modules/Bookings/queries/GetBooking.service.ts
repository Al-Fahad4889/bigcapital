import { Injectable, Inject } from '@nestjs/common';
import { Booking } from '../models/Booking.model';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetBooking {
  constructor(
    @Inject(Booking.name)
    private readonly bookingModel: TenantModelProxy<typeof Booking>,
  ) {}

  async get(id: number) {
    return this.bookingModel()
      .query()
      .findById(id)
      .withGraphFetched('passengers.[identityDocument, customer]')
      .throwIfNotFound();
  }
}