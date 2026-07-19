import { Transformer } from '@/modules/Transformer/Transformer';
import { decryptField, maskValue } from '../../Encryption/Encryption.service';
import { IdentityDocument } from '../models/IdentityDocument.model';

export class IdentityDocumentTransformer extends Transformer {
  public includeAttributes = (): string[] => {
    return ['documentNumber', 'fullName'];
  };

  public excludeAttributes = (): string[] => {
    return ['documentNumberHash', 'fullNameHash'];
  };

  documentNumber(item: IdentityDocument): string | null {
    if (!item.documentNumber) return null;

    try {
      const plaintext = decryptField(item.documentNumber);
      return this.context.canReadUnmaskedPII
        ? plaintext
        : maskValue(plaintext);
    } catch (err) {
      console.error('Failed to decrypt documentNumber:', err);
      return '[ENCRYPTED]';
    }
  }

  fullName(item: IdentityDocument): string | null {
    if (!item.fullName) return null;

    try {
      const plaintext = decryptField(item.fullName);
      return this.context.canReadUnmaskedPII
        ? plaintext
        : maskValue(plaintext);
    } catch (err) {
      console.error('Failed to decrypt fullName:', err);
      return '[ENCRYPTED]';
    }
  }
}
