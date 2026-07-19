import { IsInt, IsNotEmpty } from 'class-validator';

export class AttachPassengerDto {
  @IsInt()
  @IsNotEmpty()
  passengerId!: number;
}
