import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { CryptoService } from './services/crypto.service';
import { SecretService } from './services/secret.service';
import { ReportModule } from './report/report.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { ErrorService } from './services/error.service';

@Module({
    imports: [AppConfigModule, DatabaseModule, LoggerModule, ReportModule],
    controllers: [AppController],
    providers: [CryptoService, SecretService, ExceptionInterceptor, ErrorService],
})
export class AppModule {}
