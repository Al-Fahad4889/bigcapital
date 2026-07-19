import { Injectable, Inject } from '@nestjs/common';
import { IdentityDocument } from '../models/IdentityDocument.model';
import { TransformerInjectable } from '@/modules/Transformer/TransformerInjectable.service';
import { IdentityDocumentTransformer } from './IdentityDocumentTransformer';
import { hashValue } from '../../Encryption/Encryption.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';

@Injectable()
export class ListIdentityDocuments {
  constructor(
    @Inject(IdentityDocument.name)
    private readonly identityDocumentModel: TenantModelProxy<typeof IdentityDocument>,
    private readonly transformer: TransformerInjectable,
  ) {}

  async list(filter: {
    ownerId?: number;
    ownerType?: string;
    type?: string;
    number?: string;
  }) {
    const query = this.identityDocumentModel().query();

    if (filter.ownerId) {
      query.where('owner_id', filter.ownerId);
    }
    if (filter.ownerType) {
      query.where('owner_type', filter.ownerType);
    }
    if (filter.type) {
      query.where('type', filter.type);
    }
    if (filter.number) {
      query.where('document_number_hash', hashValue(filter.number.toUpperCase()));
    }

    const docs = await query;
    return this.transformer.transform(docs, new IdentityDocumentTransformer());
  }
}