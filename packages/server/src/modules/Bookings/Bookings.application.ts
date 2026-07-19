import { Injectable } from '@nestjs/common';
import { CreateBooking } from './commands/CreateBooking.service';
import { AttachPassengerToBooking } from './commands/AttachPassengerToBooking.service';
import { GetBooking } from './queries/GetBooking.service';
import { ListBookings } from './queries/ListBookings.service';
import { CreateBookingDto } from './dtos/CreateBooking.dto';

@Injectable()
export class BookingsApplication {
  constructor(
    private readonly createService: CreateBooking,
    private readonly attachPassengerService: AttachPassengerToBooking,
    private readonly getService: GetBooking,
    private readonly listService: ListBookings,
  ) {}

  create(dto: CreateBookingDto) {
    return this.createService.create(dto);
  }

  attachPassenger(bookingId: number, passengerId: number) {
    return this.attachPassengerService.execute(bookingId, passengerId);
  }

  get(id: number) {
    return this.getService.get(id);
  }

  list() {
    return this.listService.list();
  }
}
