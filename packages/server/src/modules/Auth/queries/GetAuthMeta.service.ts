import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthGetMetaPOJO } from '../Auth.interfaces';
import { TenantModel } from '@/modules/System/models/TenantModel';
import { S3_CLIENT } from '@/modules/S3/S3.module';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class GetAuthMetaService {
  constructor(private readonly configService: ConfigService,
  @Inject(TenantModel.name)
  private readonly tenantModel: typeof TenantModel,
  @Inject(S3_CLIENT)
  private readonly s3Client: S3Client,
  ) {}
  /**
   * Retrieves the authentication meta for SPA.
   * @returns {Promise<IAuthGetMetaPOJO>}
   */
  private async getLogoUri( logoKey: string | null): Promise<string | null> {
    if (!logoKey) {
      return null;
    }
    const s3 = this.configService.get('s3');
    const command = new GetObjectCommand({
      Bucket: s3.bucket,
      Key: logoKey,
    });
    const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    return signedUrl;
  }
  public async getAuthMeta(): Promise<IAuthGetMetaPOJO> {
    const tenant = await this.tenantModel.query().where({ isInactive: false,isDeleting: false }).withGraphFetched('metadata').orderBy('id', 'asc').first();

    const name = tenant?.metadata?.name ?? 'Agency';
    const primaryColor = tenant?.metadata?.primaryColor ?? null;;
    const logoUri = await this.getLogoUri(tenant?.metadata?.logoKey ?? null);
    return {
      signupDisabled: this.configService.get('signupRestrictions.disabled'),
      branding: {
        name,
        logoUri,
        primaryColor,
      },

    };
  }
}
