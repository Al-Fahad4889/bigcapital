import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { GetPdfTemplateTransformer } from './GetPdfTemplate.transformer';
import { PdfTemplateModel } from '../models/PdfTemplate';
import { TransformerInjectable } from '../../Transformer/TransformerInjectable.service';
import { TenantModelProxy } from '@/modules/System/models/TenantBaseModel';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3_CLIENT } from '@/modules/S3/S3.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetPdfTemplateService {
  constructor(
    @Inject(PdfTemplateModel.name)
    private readonly pdfTemplateModel: TenantModelProxy<
      typeof PdfTemplateModel
    >,
    @Inject(S3_CLIENT) private readonly s3Client: S3Client,
    private readonly transformer: TransformerInjectable,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Retrieves a pdf template by its ID.
   * @param {number} templateId - The ID of the pdf template to retrieve.
   * @return {Promise<any>} - The retrieved pdf template.
   */
  async getPdfTemplate(
    templateId: number,
    trx?: Knex.Transaction,
  ): Promise<any> {
    const template = await this.pdfTemplateModel()
      .query(trx)
      .findById(templateId)
      .throwIfNotFound();

    const companyLogoKey = template.attributes?.companyLogoKey;
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
    return this.transformer.transform(
      { ...template, companyLogoUri },
      new GetPdfTemplateTransformer(),
    );
  }
}
