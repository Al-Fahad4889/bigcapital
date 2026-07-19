import { Injectable, Inject } from '@nestjs/common';
import { IdentityDocument } from '../models/IdentityDocument.model';
import { CommandIdentityDocumentValidator } from './CommandIdentityDocumentValidator.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class DeleteIdentityDocument {
  constructor(
    @Inject(IdentityDocument.name)
    private readonly identityDocumentModel: TenantModelProxy<typeof IdentityDocument>,
    private readonly validator: CommandIdentityDocumentValidator,
  ) {}

  async delete(id: number) {
    await this.validator.validateExistOrThrowFail(id);

    return this.identityDocumentModel()
      .query()
      .deleteById(id);
  }
}
