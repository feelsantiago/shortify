import { Injectable } from '@nestjs/common';
import { LoggerInstance } from 'feel-logger';
import { LoggerProvider } from '../logger.provider';

@Injectable()
export class HttpLoggerService {
    private readonly logger: LoggerInstance<HttpLoggerService>;

    constructor(loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance(HttpLoggerService);
    }

    public write(msg: string): void {
        this.logger.info(msg);
    }
}
