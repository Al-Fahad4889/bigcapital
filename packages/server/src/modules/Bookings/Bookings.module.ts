import { Module } from '@nestjs/common';
import { RegisterTenancyModel } from '@/modules/Tenancy/TenancyModels/Tenancy.module';
import { Booking } from './models/Booking.model';
import { BookingPassenger } from './models/BookingPassenger.model';
import { BookingsController } from './Bookings.controller';
import { BookingsApplication } from './Bookings.application';
import { CreateBooking } from './commands/CreateBooking.service';
import { AttachPassengerToBooking } from './commands/AttachPassengerToBooking.service';
import { GetBooking } from './queries/GetBooking.service';
import { ListBookings } from './queries/ListBookings.service';

const models = [
  RegisterTenancyModel(Booking),
  RegisterTenancyModel(BookingPassenger),
];

@Module({
  imports: [...models],
  controllers: [BookingsController],
  providers: [
    BookingsApplication,
    CreateBooking,
    AttachPassengerToBooking,
    GetBooking,
    ListBookings,
  ],
  exports: [GetBooking, ListBookings],
})
export class BookingsModule {}