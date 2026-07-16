import { Module } from '@nestjs/common';
import { RegisterTenancyModel } from '@/modules/Tenancy/TenancyModels/Tenancy.module';
import { TravelServiceType } from './models/TravelServiceType.model';
import { TravelServiceTypeController } from './TravelServiceType.controller';
import { TravelServiceTypeApplication } from './TravelServiceType.application';
import { CreateTravelServiceType } from './commands/CreateTravelServiceType.service';
import { EditTravelServiceType } from './commands/EditTravelServiceType.service';
import { DeleteTravelServiceType } from './commands/DeleteTravelServiceType.service';
import { GetTravelServiceType } from './queries/GetTravelServiceType.service';
import { GetTravelServiceTypes } from './queries/GetTravelServiceTypes.service';
import { CommandTravelServiceTypeValidator } from './commands/CommandTravelServiceTypeValidator.service';

const models = [RegisterTenancyModel(TravelServiceType)];

@Module({
  imports: [...models],
  controllers: [TravelServiceTypeController],
  providers: [
    TravelServiceTypeApplication,
    CreateTravelServiceType,
    EditTravelServiceType,
    DeleteTravelServiceType,
    GetTravelServiceType,
    GetTravelServiceTypes,
    CommandTravelServiceTypeValidator,
  ],
})
export class TravelServiceTypesModule {}