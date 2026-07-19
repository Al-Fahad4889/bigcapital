import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingsApplication } from './Bookings.application';
import { CreateBookingDto } from './dtos/CreateBooking.dto';
import { AttachPassengerDto } from './dtos/AttachPassenger.dto';
import { BookingAction } from './Bookings.types';
import { ApiCommonHeaders } from '@/common/decorators/ApiCommonHeaders';
import { RequirePermission } from '@/modules/Roles/RequirePermission.decorator';
import { PermissionGuard } from '@/modules/Roles/Permission.guard';
import { AuthorizationGuard } from '@/modules/Roles/Authorization.guard';
import { AbilitySubject } from '@/modules/Roles/Roles.types';

@Controller('bookings')
@ApiTags('Bookings')
@ApiCommonHeaders()
@UseGuards(AuthorizationGuard, PermissionGuard)
export class BookingsController {
  constructor(
    private readonly application: BookingsApplication,
  ) {}

  @Post()
  @RequirePermission(BookingAction.CREATE, AbilitySubject.Booking)
  @ApiOperation({ summary: 'Create a new booking.' })
  create(@Body() dto: CreateBookingDto) {
    return this.application.create(dto);
  }

  @Get(':id')
  @RequirePermission(BookingAction.VIEW, AbilitySubject.Booking)
  @ApiOperation({ summary: 'Get booking details with passengers.' })
  get(@Param('id') id: number) {
    return this.application.get(id);
  }

  @Get()
  @RequirePermission(BookingAction.VIEW, AbilitySubject.Booking)
  @ApiOperation({ summary: 'List bookings.' })
  list() {
    return this.application.list();
  }

  @Post(':id/passengers')
  @RequirePermission(BookingAction.EDIT, AbilitySubject.Booking)
  @ApiOperation({ summary: 'Attach a passenger to the booking.' })
  attachPassenger(
    @Param('id') id: number,
    @Body() dto: AttachPassengerDto,
  ) {
    return this.application.attachPassenger(id, dto.passengerId);
  }
}