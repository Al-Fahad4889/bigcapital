import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IdentityDocument } from '../models/IdentityDocument.model';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class CommandIdentityDocumentValidator {
  constructor(
    @Inject(IdentityDocument.name)
    private readonly identityDocumentModel: TenantModelProxy<typeof IdentityDocument>,
  ) {}

  async validateExistOrThrowFail(id: number): Promise<IdentityDocument> {
    const doc = await this.identityDocumentModel()
      .query()
      .findById(id);

    if (!doc) {
      throw new NotFoundException('Identity document not found.');
    }
    return doc;
  }
}