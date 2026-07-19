import { Injectable } from '@nestjs/common';
import { CreateIdentityDocument } from './commands/CreateIdentityDocument.service';
import { EditIdentityDocument } from './commands/EditIdentityDocument.service';
import { DeleteIdentityDocument } from './commands/DeleteIdentityDocument.service';
import { GetIdentityDocument } from './queries/GetIdentityDocument.service';
import { ListIdentityDocuments } from './queries/ListIdentityDocuments.service';
import { CreateIdentityDocumentDto, EditIdentityDocumentDto } from './dtos/IdentityDocument.dto';

@Injectable()
export class IdentityDocumentsApplication {
  constructor(
    private readonly createService: CreateIdentityDocument,
    private readonly editService: EditIdentityDocument,
    private readonly deleteService: DeleteIdentityDocument,
    private readonly getService: GetIdentityDocument,
    private readonly listService: ListIdentityDocuments,
  ) {}

  create(dto: CreateIdentityDocumentDto) {
    return this.createService.create(dto);
  }

  edit(id: number, dto: EditIdentityDocumentDto) {
    return this.editService.edit(id, dto);
  }

  delete(id: number) {
    return this.deleteService.delete(id);
  }

  get(id: number) {
    return this.getService.get(id);
  }

  list(filter: { ownerId?: number; ownerType?: string; type?: string; number?: string }) {
    return this.listService.list(filter);
  }
}