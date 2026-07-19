import { Model } from 'objection';
import { BaseModel } from '@/models/Model';

export class Booking extends BaseModel {
  id!: number;
  customerId!: number;
  bookingReference!: string;
  status!: string;
  travelDateFrom?: string;
  travelDateTo?: string;
  agentId?: number;
  totalAmount?: number;
  currencyCode?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;

  static get tableName() {
    return 'bookings';
  }

  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  static get relationMappings() {
    const { Customer } = require('../../Customers/models/Customer');
    const { Passenger } = require('../../Passengers/models/Passenger.model');

    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: { from: 'bookings.customerId', to: 'contacts.id' },
      },
      passengers: {
        relation: Model.ManyToManyRelation,
        modelClass: Passenger,
        join: {
          from: 'bookings.id',
          through: {
            modelClass: require('./BookingPassenger.model').BookingPassenger,
            from: 'booking_passengers.bookingId',
            to: 'booking_passengers.passengerId',
          },
          to: 'passengers.id',
        },
      },
    };
  }
}