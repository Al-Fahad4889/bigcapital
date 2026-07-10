import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

class AuthBrandingDto {
  @ApiProperty({ description: 'Branding name' })
  name: string;

  @ApiPropertyOptional({ description: 'Branding logo uri',nullable: true })
  logoUri: string | null;

  @ApiPropertyOptional({ description: 'Branding primary color', nullable: true })
  primaryColor: string | null;

}
export class AuthMetaResponseDto {
  @ApiProperty({ description: 'Whether signup is disabled' })
  signupDisabled: boolean;

  @ApiProperty({ type: AuthBrandingDto })
  branding: AuthBrandingDto;
}

