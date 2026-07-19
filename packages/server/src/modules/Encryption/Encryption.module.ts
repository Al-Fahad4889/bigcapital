import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from './Encryption.service';

@Global()
@Module({
  providers: [
    {
      provide: 'ENCRYPTION_KEY',
      useFactory: (configService: ConfigService) => {
        const key = configService.get<string>('ENCRYPTION_KEY');
        if (!key) {
          throw new Error(
            'ENCRYPTION_KEY environment variable is required for passport encryption.',
          );
        }
        return key;
      },
      inject: [ConfigService],
    },
    EncryptionService,
  ],
  exports: [EncryptionService],
})
export class EncryptionModule {}
