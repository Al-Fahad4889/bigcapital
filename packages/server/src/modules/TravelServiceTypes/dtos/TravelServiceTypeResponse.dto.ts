import { ApiProperty } from '@nestjs/swagger';

export class TravelServiceTypeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  taxRateId?: number;

  @ApiProperty()
  active: boolean;
}