import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateManifestDto {
  @IsInt()
  @IsNotEmpty()
  bookingId!: number;
}
