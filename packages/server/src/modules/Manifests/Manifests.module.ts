import { Module } from '@nestjs/common';
import { RegisterTenancyModel } from '@/modules/Tenancy/TenancyModels/Tenancy.module';
import { BookingsModule } from '../Bookings/Bookings.module';
import { TravelDocumentsModule } from '../TravelDocuments/TravelDocuments.module';
import { Manifest } from './models/Manifest.model';
import { ManifestsController } from './Manifests.controller';
import { ManifestsApplication } from './Manifests.application';
import { GenerateManifest } from './commands/GenerateManifest.service';
import { GetManifest } from './queries/GetManifest.service';
import { ListManifests } from './queries/ListManifests.service';
import { BookingConfirmedGenerateManifestSubscriber } from './subscribers/BookingConfirmedGenerateManifestSubscriber';

const models = [RegisterTenancyModel(Manifest)];

@Module({
  imports: [
    ...models,
    BookingsModule,
    TravelDocumentsModule,
  ],
  controllers: [ManifestsController],
  providers: [
    ManifestsApplication,
    GenerateManifest,
    GetManifest,
    ListManifests,
    BookingConfirmedGenerateManifestSubscriber,
  ],
  exports: [GenerateManifest],
})
export class ManifestsModule {}
