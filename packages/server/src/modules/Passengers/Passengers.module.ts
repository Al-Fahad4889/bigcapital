import { Module } from '@nestjs/common';
import { RegisterTenancyModel } from '@/modules/Tenancy/TenancyModels/Tenancy.module';
import { IdentityDocumentsModule } from '../IdentityDocuments/IdentityDocuments.module';
import { BookingsModule } from '../Bookings/Bookings.module';
import { Passenger } from './models/Passenger.model';
import { PassengersController } from './Passengers.controller';
import { PassengersApplication } from './Passengers.application';
import { CreatePassenger } from './commands/CreatePassenger.service';
import { EditPassenger } from './commands/EditPassenger.service';
import { DeletePassenger } from './commands/DeletePassenger.service';
import { GetPassenger } from './queries/GetPassenger.service';
import { ListPassengers } from './queries/ListPassengers.service';

const models = [RegisterTenancyModel(Passenger)];

@Module({
  imports: [
    ...models,
    IdentityDocumentsModule,
    BookingsModule,
  ],
  controllers: [PassengersController],
  providers: [
    PassengersApplication,
    CreatePassenger,
    EditPassenger,
    DeletePassenger,
    GetPassenger,
    ListPassengers,
  ],
})
export class PassengersModule {}