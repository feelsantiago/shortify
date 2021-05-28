import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ReportModule } from './report/report.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [AppConfigModule, DatabaseModule, LoggerModule, ReportModule, SharedModule],
    controllers: [AppController],
    providers: [AppService, ExceptionInterceptor],
})
export class AppModule {}
