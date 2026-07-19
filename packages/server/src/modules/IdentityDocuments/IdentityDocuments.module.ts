import { Module } from '@nestjs/common';
import { RegisterTenancyModel } from '@/modules/Tenancy/TenancyModels/Tenancy.module';
import { IdentityDocument } from './models/IdentityDocument.model';
import { IdentityDocumentsController } from './IdentityDocuments.controller';
import { IdentityDocumentsApplication } from './IdentityDocuments.application';
import { CreateIdentityDocument } from './commands/CreateIdentityDocument.service';
import { EditIdentityDocument } from './commands/EditIdentityDocument.service';
import { DeleteIdentityDocument } from './commands/DeleteIdentityDocument.service';
import { GetIdentityDocument } from './queries/GetIdentityDocument.service';
import { ListIdentityDocuments } from './queries/ListIdentityDocuments.service';
import { CommandIdentityDocumentValidator } from './commands/CommandIdentityDocumentValidator.service';

const models = [RegisterTenancyModel(IdentityDocument)];

@Module({
  imports: [...models],
  controllers: [IdentityDocumentsController],
  providers: [
    IdentityDocumentsApplication,
    CreateIdentityDocument,
    EditIdentityDocument,
    DeleteIdentityDocument,
    GetIdentityDocument,
    ListIdentityDocuments,
    CommandIdentityDocumentValidator,
  ],
  exports: [
    CreateIdentityDocument,
    EditIdentityDocument,
  ],
})
export class IdentityDocumentsModule {}