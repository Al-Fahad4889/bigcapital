import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdentityDocumentsApplication } from './IdentityDocuments.application';
import { CreateIdentityDocumentDto, EditIdentityDocumentDto } from './dtos/IdentityDocument.dto';
import { IdentityDocumentAction } from './IdentityDocuments.types';
import { ApiCommonHeaders } from '@/common/decorators/ApiCommonHeaders';
import { RequirePermission } from '@/modules/Roles/RequirePermission.decorator';
import { PermissionGuard } from '@/modules/Roles/Permission.guard';
import { AuthorizationGuard } from '@/modules/Roles/Authorization.guard';
import { AbilitySubject } from '@/modules/Roles/Roles.types';

@Controller('identity-documents')
@ApiTags('Identity Documents')
@ApiCommonHeaders()
@UseGuards(AuthorizationGuard, PermissionGuard)
export class IdentityDocumentsController {
  constructor(
    private readonly application: IdentityDocumentsApplication,
  ) {}

  @Post()
  @RequirePermission(IdentityDocumentAction.CREATE, AbilitySubject.PII)
  @ApiOperation({ summary: 'Create a new identity document.' })
  create(@Body() dto: CreateIdentityDocumentDto) {
    return this.application.create(dto);
  }

  @Patch(':id')
  @RequirePermission(IdentityDocumentAction.EDIT, AbilitySubject.PII)
  @ApiOperation({ summary: 'Edit the given identity document.' })
  edit(@Param('id') id: number, @Body() dto: EditIdentityDocumentDto) {
    return this.application.edit(id, dto);
  }

  @Delete(':id')
  @RequirePermission(IdentityDocumentAction.DELETE, AbilitySubject.PII)
  @ApiOperation({ summary: 'Delete the given identity document.' })
  delete(@Param('id') id: number) {
    return this.application.delete(id);
  }

  @Get(':id')
  @RequirePermission(IdentityDocumentAction.VIEW, AbilitySubject.PII)
  @ApiOperation({ summary: 'Get identity document details.' })
  get(@Param('id') id: number) {
    return this.application.get(id);
  }

  @Get()
  @RequirePermission(IdentityDocumentAction.VIEW, AbilitySubject.PII)
  @ApiOperation({ summary: 'List identity documents.' })
  list(
    @Query('ownerId') ownerId?: number,
    @Query('ownerType') ownerType?: string,
    @Query('type') type?: string,
    @Query('number') number?: string,
  ) {
    return this.application.list({ ownerId, ownerType, type, number });
  }
}