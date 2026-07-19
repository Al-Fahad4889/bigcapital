import {
  Controller, Get, Param, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TravelDocumentsApplication } from './TravelDocuments.application';
import { TravelDocumentAction } from './TravelDocuments.types';
import { ApiCommonHeaders } from '@/common/decorators/ApiCommonHeaders';
import { RequirePermission } from '@/modules/Roles/RequirePermission.decorator';
import { PermissionGuard } from '@/modules/Roles/Permission.guard';
import { AuthorizationGuard } from '@/modules/Roles/Authorization.guard';
import { AbilitySubject } from '@/modules/Roles/Roles.types';

@Controller('travel-documents')
@ApiTags('Travel Documents')
@ApiCommonHeaders()
@UseGuards(AuthorizationGuard, PermissionGuard)
export class TravelDocumentsController {
  constructor(
    private readonly application: TravelDocumentsApplication,
  ) {}

  @Get(':id')
  @RequirePermission(TravelDocumentAction.VIEW, AbilitySubject.Booking)
  @ApiOperation({ summary: 'Get travel document details with passenger data.' })
  get(@Param('id') id: number) {
    return this.application.get(id);
  }

  @Get()
  @RequirePermission(TravelDocumentAction.VIEW, AbilitySubject.Booking)
  @ApiOperation({ summary: 'List travel documents for a manifest.' })
  listByManifest(@Query('manifestId') manifestId: number) {
    return this.application.listByManifest(manifestId);
  }
}
