import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengersApplication } from './Passengers.application';
import { CreatePassengerDto } from './dtos/CreatePassenger.dto';
import { EditPassengerDto } from './dtos/EditPassenger.dto';
import { PassengerAction } from './Passengers.types';
import { ApiCommonHeaders } from '@/common/decorators/ApiCommonHeaders';
import { RequirePermission } from '@/modules/Roles/RequirePermission.decorator';
import { PermissionGuard } from '@/modules/Roles/Permission.guard';
import { AuthorizationGuard } from '@/modules/Roles/Authorization.guard';
import { AbilitySubject } from '@/modules/Roles/Roles.types';

@Controller('passengers')
@ApiTags('Passengers')
@ApiCommonHeaders()
@UseGuards(AuthorizationGuard, PermissionGuard)
export class PassengersController {
  constructor(
    private readonly application: PassengersApplication,
  ) {}

  @Post()
  @RequirePermission(PassengerAction.CREATE, AbilitySubject.PII)
  @ApiOperation({ summary: 'Create a new passenger with passport data.' })
  create(@Body() dto: CreatePassengerDto) {
    return this.application.create(dto);
  }

  @Patch(':id')
  @RequirePermission(PassengerAction.EDIT, AbilitySubject.PII)
  @ApiOperation({ summary: 'Edit the given passenger.' })
  edit(@Param('id') id: number, @Body() dto: EditPassengerDto) {
    return this.application.edit(id, dto);
  }

  @Delete(':id')
  @RequirePermission(PassengerAction.DELETE, AbilitySubject.PII)
  @ApiOperation({ summary: 'Deactivate the given passenger.' })
  delete(@Param('id') id: number) {
    return this.application.delete(id);
  }

  @Get(':id')
  @RequirePermission(PassengerAction.VIEW, AbilitySubject.PII)
  @ApiOperation({ summary: 'Get passenger details with passport data.' })
  get(@Param('id') id: number) {
    return this.application.get(id);
  }

  @Get()
  @RequirePermission(PassengerAction.VIEW, AbilitySubject.PII)
  @ApiOperation({ summary: 'List passengers.' })
  list(
    @Query('customerId') customerId?: number,
    @Query('active') active?: boolean,
  ) {
    return this.application.list({ customerId, active });
  }
}