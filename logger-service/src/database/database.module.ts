import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/app-config.service';
import { AppConfigModule } from '../config/app-config.module';
import { LogRepository } from './repositories/log.repository';
import { modelsProviders } from './models.provider';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (appConfigService: AppConfigService) => ({
                uri: appConfigService.databaseUrl,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }),
            inject: [AppConfigService],
        }),
        MongooseModule.forFeature(modelsProviders),
    ],
    providers: [LogRepository],
    exports: [LogRepository],
})
export class DatabaseModule {}
