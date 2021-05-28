import { ClientOptions, Transport, RmqOptions } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config.service';

@Injectable()
export class MessageBrokerClientOptions {
    constructor(private readonly configService: AppConfigService) {}

    public get reportService(): RmqOptions {
        const { amqpUrl, amqpReportQueue } = this.configService;

        const options: ClientOptions = {
            transport: Transport.RMQ,
            options: {
                urls: [amqpUrl],
                queue: amqpReportQueue,
                queueOptions: { durable: false },
            },
        };

        return options;
    }
}
