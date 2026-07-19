import {
  Controller, Get, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManifestsApplication } from './Manifests.application';
import { ManifestAction } from './Manifests.types';
import { ApiCommonHeaders } from '@/common/decorators/ApiCommonHeaders';
import { RequirePermission } from '@/modules/Roles/RequirePermission.decorator';
import { PermissionGuard } from '@/modules/Roles/Permission.guard';
import { AuthorizationGuard } from '@/modules/Roles/Authorization.guard';
import { AbilitySubject } from '@/modules/Roles/Roles.types';

@Controller('manifests')
@ApiTags('Manifests')
@ApiCommonHeaders()
@UseGuards(AuthorizationGuard, PermissionGuard)
export class ManifestsController {
  constructor(
    private readonly application: ManifestsApplication,
  ) {}

  @Post('generate/:bookingId')
  @RequirePermission(ManifestAction.CREATE, AbilitySubject.Booking)
  @ApiOperation({ summary: 'Generate a manifest for the given booking.' })
  generate(@Param('bookingId') bookingId: number) {
    return this.application.generate(bookingId);
  }

  @Get(':id')
  @RequirePermission(ManifestAction.VIEW, AbilitySubject.Booking)
  @ApiOperation({ summary: 'Get manifest details.' })
  get(@Param('id') id: number) {
    return this.application.get(id);
  }

  @Get()
  @RequirePermission(ManifestAction.VIEW, AbilitySubject.Booking)
  @ApiOperation({ summary: 'List manifests.' })
  list(
    @Query('bookingId') bookingId?: number,
    @Query('status') status?: string,
  ) {
    return this.application.list({ bookingId, status });
  }
}
