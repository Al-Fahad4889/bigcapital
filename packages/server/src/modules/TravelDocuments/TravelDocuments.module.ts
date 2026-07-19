import { Module } from '@nestjs/common';
import { RegisterTenancyModel } from '@/modules/Tenancy/TenancyModels/Tenancy.module';
import { PassengersModule } from '../Passengers/Passengers.module';
import { TravelDocument } from './models/TravelDocument.model';
import { TravelDocumentsController } from './TravelDocuments.controller';
import { TravelDocumentsApplication } from './TravelDocuments.application';
import { GetTravelDocument } from './queries/GetTravelDocument.service';

const models = [RegisterTenancyModel(TravelDocument)];

@Module({
  imports: [
    ...models,
    PassengersModule,
  ],
  controllers: [TravelDocumentsController],
  providers: [
    TravelDocumentsApplication,
    GetTravelDocument,
  ],
  exports: [GetTravelDocument, TravelDocumentsApplication],
})
export class TravelDocumentsModule {}
