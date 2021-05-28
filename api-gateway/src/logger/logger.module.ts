import { Module } from '@nestjs/common';
import { LoggerProvider } from './logger.provider';
import { AppConfigModule } from '../config/app-config.module';
import { loggerOptionsProvider } from './config/logger-service.options';
import { HttpLoggerService } from './config/http-logger.service';

@Module({
    imports: [AppConfigModule],
    providers: [LoggerProvider, ...loggerOptionsProvider, HttpLoggerService],
    exports: [LoggerProvider, ...loggerOptionsProvider, HttpLoggerService],
})
export class LoggerModule {}
