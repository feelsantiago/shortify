import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/app-config.service';
import { AppConfigModule } from '../config/app-config.module';
import { modelsProviders } from './models.provider';
import { ClientRepository } from './repositories/client.repository';

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
        MongooseModule.forFeature(modelsProviders),
    ],
    providers: [ClientRepository],
    exports: [ClientRepository],
})
export class DatabaseModule {}
