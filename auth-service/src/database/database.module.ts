import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/app-config.service';
import { AppConfigModule } from '../config/app-config.module';
import { UserRepository } from './user.repository';
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
                useUnifiedTopology: true,
            }),
            inject: [AppConfigService],
        }),
        MongooseModule.forFeatureAsync([...modelsProviders]),
    ],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class DatabaseModule {}
