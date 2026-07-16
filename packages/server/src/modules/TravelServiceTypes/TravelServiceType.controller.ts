import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TravelServiceTypeApplication } from './TravelServiceType.application';
import { CreateTravelServiceTypeDto, EditTravelServiceTypeDto } from './dtos/TravelServiceType.dto';
import { TravelServiceTypeResponseDto } from './dtos/TravelServiceTypeResponse.dto';
import { TravelServiceTypeAction } from './TravelServiceType.types';
import { ApiCommonHeaders } from '@/common/decorators/ApiCommonHeaders';
import { RequirePermission } from '@/modules/Roles/RequirePermission.decorator';
import { PermissionGuard } from '@/modules/Roles/Permission.guard';
import { AuthorizationGuard } from '@/modules/Roles/Authorization.guard';
import { AbilitySubject } from '@/modules/Roles/Roles.types';

@Controller('travel-service-types')
@ApiTags('Travel Service Types')
@ApiCommonHeaders()
@UseGuards(AuthorizationGuard, PermissionGuard)
export class TravelServiceTypeController {
  constructor(
    private readonly application: TravelServiceTypeApplication,
  ) {}

  @Post()
  @RequirePermission(TravelServiceTypeAction.CREATE, AbilitySubject.TravelServiceType)
  @ApiOperation({ summary: 'Create a new travel service type.' })
  create(@Body() dto: CreateTravelServiceTypeDto) {
    return this.application.create(dto);
  }

  @Put(':id')
  @RequirePermission(TravelServiceTypeAction.EDIT, AbilitySubject.TravelServiceType)
  @ApiOperation({ summary: 'Edit the given travel service type.' })
  edit(@Param('id') id: number, @Body() dto: EditTravelServiceTypeDto) {
    return this.application.edit(id, dto);
  }

  @Delete(':id')
  @RequirePermission(TravelServiceTypeAction.DELETE, AbilitySubject.TravelServiceType)
  @ApiOperation({ summary: 'Delete the given travel service type.' })
  delete(@Param('id') id: number) {
    return this.application.delete(id);
  }

  @Get(':id')
  @RequirePermission(TravelServiceTypeAction.VIEW, AbilitySubject.TravelServiceType)
  @ApiOperation({ summary: 'Get travel service type details.' })
  get(@Param('id') id: number) {
    return this.application.get(id);
  }

  @Get()
  @RequirePermission(TravelServiceTypeAction.VIEW, AbilitySubject.TravelServiceType)
  @ApiOperation({ summary: 'List travel service types.' })
  list() {
    return this.application.list();
  }
}