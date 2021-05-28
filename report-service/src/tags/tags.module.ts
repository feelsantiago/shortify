import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { GrpcClientModule } from '../grpc/grpc-client.module';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseModule } from '../database/database.module';
import { TagsController } from './tags.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [DatabaseModule, LoggerModule, AppConfigModule, GrpcClientModule, SharedModule],
    controllers: [TagsController],
})
export class TagsModule {}
