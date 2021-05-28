import { Injectable, Type, Inject } from '@nestjs/common';
import { ClientProxyFactory, ClientProxy, ClientOptions } from '@nestjs/microservices';
import cryptoRandomString from 'crypto-random-string';
import { Logger, LoggerInstance } from 'feel-logger';
import { AppConfigService } from '../config/app-config.service';
import { LoggerServiceOptionsToken } from './config/logger-service.options';
import { LoggerServiceTransport } from './config/logger-service.transport';

@Injectable()
export class LoggerProvider {
    private readonly service: ClientProxy;

    constructor(
        private readonly configService: AppConfigService,
        @Inject(LoggerServiceOptionsToken) loggerOptions: ClientOptions,
    ) {
        if (this.configService.sendToService) {
            this.service = ClientProxyFactory.create(loggerOptions);
        }

        Logger.init({
            file: this.configService.persistToFile,
            fileOptions: {
                filename: '%DATE%-Gateway.log',
            },
            name: 'Gateway',
            transports: this.configService.sendToService
                ? [new LoggerServiceTransport({ client: this.service })]
                : undefined,
        });
    }

    public createLoggerInstance<T>(context: Type<T> | string): LoggerInstance<T> {
        return Logger.createLoggerInstance(context);
    }

    public createLoggerTag(): string {
        return `tag=${cryptoRandomString({
            length: this.configService.tagLength,
            characters: this.configService.tagCharacters,
        })}`;
    }
}
