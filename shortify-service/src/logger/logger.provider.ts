import { Injectable, Type, Inject } from '@nestjs/common';
import { ClientProxyFactory, ClientProxy, ClientOptions, RpcException } from '@nestjs/microservices';
import { Logger, LoggerInstance } from 'feel-logger';
import { Metadata } from 'grpc';
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
                filename: '%DATE%-ShortService.log',
            },
            name: 'ShortService',
            transports: this.configService.sendToService
                ? [new LoggerServiceTransport({ client: this.service })]
                : undefined,
        });
    }

    public createLoggerInstance<T>(context: Type<T> | string): LoggerInstance<T> {
        return Logger.createLoggerInstance(context);
    }

    public extractLoggerTag(metadata: Metadata): string {
        try {
            return metadata.get('tag').toString();
        } catch {
            throw new RpcException('Tag not provided');
        }
    }
}
