import { Injectable, Inject } from '@nestjs/common';
import { IdentityDocument } from '../models/IdentityDocument.model';
import { CreateIdentityDocumentDto } from '../dtos/IdentityDocument.dto';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class CreateIdentityDocument {
  constructor(
    @Inject(IdentityDocument.name)
    private readonly identityDocumentModel: TenantModelProxy<typeof IdentityDocument>,
  ) {}

  async create(dto: CreateIdentityDocumentDto) {
    return this.identityDocumentModel()
      .query()
      .insertAndFetch({ ...dto });
  }
}