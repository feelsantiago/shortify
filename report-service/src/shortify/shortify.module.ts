import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ShortifyController } from './shortify.controller';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { AppConfigModule } from '../config/app-config.module';
import { GrpcClientModule } from '../grpc/grpc-client.module';
import { ShortifyReportController } from './shortify-report.controller';
import { ShortifyService } from './shortify.service';

@Module({
    imports: [DatabaseModule, AppConfigModule, GrpcClientModule, LoggerModule, SharedModule],
    controllers: [ShortifyController, ShortifyReportController],
    providers: [ShortifyService],
})
export class ShortifyModule {}
