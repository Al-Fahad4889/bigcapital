import { Transformer } from '@/modules/Transformer/Transformer';
import { PassengerTransformer } from '../../Passengers/queries/PassengerTransformer';
import { Booking } from '../models/Booking.model';

export class BookingTransformer extends Transformer {
  public includeAttributes = (): string[] => {
    return ['passengers'];
  };

  transform = (booking: Booking) => {
    return {
      id: booking.id,
      bookingReference: booking.bookingReference,
      status: booking.status,
      travelDateFrom: booking.travelDateFrom,
      travelDateTo: booking.travelDateTo,
      customerId: booking.customerId,
      agentId: booking.agentId,
      totalAmount: booking.totalAmount,
      currencyCode: booking.currencyCode,
      notes: booking.notes,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  };

  async passengers(booking: Booking) {
    const passengers = await booking.$relatedQuery('passengers');
    return this.item(passengers, new PassengerTransformer());
  }
}