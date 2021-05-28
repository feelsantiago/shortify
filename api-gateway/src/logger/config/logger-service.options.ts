import { Transport, ClientOptions } from '@nestjs/microservices';
import { Provider } from '@nestjs/common';
import { AppConfigService } from '../../config/app-config.service';

export const LoggerServiceOptionsToken = Symbol('LoggerServiceOptionsProvider').toString();

export const loggerOptionsProvider: Array<Provider> = [
    {
        provide: LoggerServiceOptionsToken,
        useFactory: (configService: AppConfigService): ClientOptions => ({
            transport: Transport.RMQ,
            options: {
                urls: [configService.amqpUrl],
                queue: configService.amqpLoggerQueue,
                queueOptions: {
                    durable: false,
                },
            },
        }),
        inject: [AppConfigService],
    },
];
