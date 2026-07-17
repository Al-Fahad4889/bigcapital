import { Inject, Injectable } from '@nestjs/common';
import { CommonOrganizationBrandingAttributes } from '../types';
import { TenancyContext } from '../../Tenancy/TenancyContext.service';
import { S3_CLIENT } from '@/modules/S3/S3.module';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetOrganizationBrandingAttributesService {
  constructor(
    private readonly tenancyContext: TenancyContext,
    @Inject(S3_CLIENT) private readonly s3Client: S3Client,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Retrieves the given organization branding attributes initial state.
   * @returns {Promise<CommonOrganizationBrandingAttributes>}
   */
  public async execute(): Promise<CommonOrganizationBrandingAttributes> {
    const tenant = await this.tenancyContext.getTenant(true);
    const tenantMetadata = tenant.metadata;

    const companyName = tenantMetadata?.name;
    const primaryColor = tenantMetadata?.primaryColor;
    const companyLogoKey = tenantMetadata?.logoKey;
    const companyAddress = tenantMetadata?.addressTextFormatted;

    let companyLogoUri: string | null = null;
    if (companyLogoKey) {
      try {
        const command = new GetObjectCommand({
          Bucket: this.configService.get('s3').bucket,
          Key: companyLogoKey,
        });
        const response = await this.s3Client.send(command);
        const bytes = await response.Body.transformToByteArray();
        const base64 = Buffer.from(bytes).toString('base64');
        const mimeType = response.ContentType || 'image/png';
        companyLogoUri = `data:${mimeType};base64,${base64}`;
      } catch {
        companyLogoUri = null;
      }
    }

    return {
      companyName,
      companyAddress,
      companyLogoUri: companyLogoUri ?? undefined,
      companyLogoKey,
      primaryColor,
    };
  }
}
