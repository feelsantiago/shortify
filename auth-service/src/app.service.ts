import { Injectable } from '@nestjs/common';
import { LoggerInstance } from 'feel-logger';
import { LoggerProvider } from './logger/logger.provider';

@Injectable()
export class AppService {
    private readonly logger: LoggerInstance<AppService>;

    constructor(private readonly loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance<AppService>(AppService);
    }
}
