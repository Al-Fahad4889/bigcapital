import { Model } from 'objection';
import { BaseModel } from '@/models/Model';
import { encryptField, hashValue } from '../../Encryption/Encryption.service';

export class IdentityDocument extends BaseModel {
  id!: number;
  ownerId!: number;
  ownerType!: string;
  type!: string;
  documentNumber!: string;
  documentNumberHash!: string;
  fullName!: string;
  fullNameHash!: string;
  issuingCountry?: string;
  issuingAuthority?: string;
  issuedAt?: string;
  expiresAt?: string;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;

  static get tableName() {
    return 'identity_documents';
  }

  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  $beforeInsert(context) {
    return Promise.resolve(super.$beforeInsert(context)).then(() => {
      if (this.documentNumber) {
        this.documentNumberHash = hashValue(this.documentNumber.toUpperCase());
        this.documentNumber = encryptField(this.documentNumber);
      }
      if (this.fullName) {
        this.fullNameHash = hashValue(this.fullName.toUpperCase());
        this.fullName = encryptField(this.fullName);
      }
    });
  }

  $beforeUpdate(opt, context) {
    return Promise.resolve(super.$beforeUpdate(opt, context)).then(() => {
      if (this.documentNumber !== undefined) {
        this.documentNumberHash = hashValue(this.documentNumber.toUpperCase());
        this.documentNumber = encryptField(this.documentNumber);
      }
      if (this.fullName !== undefined) {
        this.fullNameHash = hashValue(this.fullName.toUpperCase());
        this.fullName = encryptField(this.fullName);
      }
    });
  }
}