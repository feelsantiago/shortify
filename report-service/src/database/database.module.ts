import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/app-config.module';
import { AppConfigService } from '../config/app-config.service';
import { modelsProvider, modelsAsyncProvider } from './models.provider';
import { ClientRepository } from './repositories/client.repository';
import { ShortifyRepository } from './repositories/shortify.repository';
import { TagUsersRepository } from './repositories/tag-users.repository';
import { UserRepository } from './repositories/user.repository';

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
        MongooseModule.forFeature(modelsProvider),
        MongooseModule.forFeatureAsync(modelsAsyncProvider),
    ],
    providers: [ClientRepository, ShortifyRepository, UserRepository, TagUsersRepository],
    exports: [ClientRepository, ShortifyRepository, UserRepository, TagUsersRepository],
})
export class DatabaseModule {}
