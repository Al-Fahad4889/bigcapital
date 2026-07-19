import { Injectable, Inject } from '@nestjs/common';
import { IdentityDocument } from '../models/IdentityDocument.model';
import { EditIdentityDocumentDto } from '../dtos/IdentityDocument.dto';
import { CommandIdentityDocumentValidator } from './CommandIdentityDocumentValidator.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class EditIdentityDocument {
  constructor(
    @Inject(IdentityDocument.name)
    private readonly identityDocumentModel: TenantModelProxy<typeof IdentityDocument>,
    private readonly validator: CommandIdentityDocumentValidator,
  ) {}

  async edit(id: number, dto: EditIdentityDocumentDto) {
    await this.validator.validateExistOrThrowFail(id);

    return this.identityDocumentModel()
      .query()
      .patchAndFetchById(id, { ...dto });
  }
}