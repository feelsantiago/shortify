import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/app-config.module';
import { ShortifyRepository } from './shortify.repository';
import { AppConfigService } from '../config/app-config.service';
import { LinkSchema, LinkSchemaProvide } from './schemas/link';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (appConfigService: AppConfigService) => ({
                uri: appConfigService.databaseUrl,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }),
            inject: [AppConfigService],
        }),
        MongooseModule.forFeature([{ name: LinkSchemaProvide, schema: LinkSchema, collection: 'links' }]),
    ],
    providers: [ShortifyRepository],
    exports: [ShortifyRepository],
})
export class DatabaseModule {}
