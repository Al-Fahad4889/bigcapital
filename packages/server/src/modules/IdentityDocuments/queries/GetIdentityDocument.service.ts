import { Injectable, Inject } from '@nestjs/common';
import { IdentityDocument } from '../models/IdentityDocument.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { IdentityDocumentTransformer } from './IdentityDocumentTransformer';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class GetIdentityDocument {
  constructor(
    @Inject(IdentityDocument.name)
    private readonly identityDocumentModel: TenantModelProxy<typeof IdentityDocument>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async get(id: number) {
    const doc = await this.identityDocumentModel()
      .query()
      .findById(id)
      .throwIfNotFound();

    return this.transformer.transform(doc, new IdentityDocumentTransformer());
  }
}