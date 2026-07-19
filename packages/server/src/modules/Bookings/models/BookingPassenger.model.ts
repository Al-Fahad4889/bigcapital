import { BaseModel } from '@/models/Model';

export class BookingPassenger extends BaseModel {
  id!: number;
  bookingId!: number;
  passengerId!: number;

  static get tableName() {
    return 'booking_passengers';
  }

  get timestamps() {
    return ['createdAt'];
  }

  static get idColumn() {
    return 'id';
  }
}