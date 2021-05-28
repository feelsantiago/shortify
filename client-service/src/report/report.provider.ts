import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Closeable, ClientProxy } from '@nestjs/microservices';
import { REPORT_OPERATIONS } from './operations/report.operation';
import { MessageBrokerClientOptions } from '../config/options/message-broker-client-options';

export const reportProviders: Array<Provider> = [
    {
        provide: REPORT_OPERATIONS.SERVICE_NAME,
        useFactory: (messageBrokerClientOptions: MessageBrokerClientOptions): ClientProxy & Closeable => {
            return ClientProxyFactory.create(messageBrokerClientOptions.reportService);
        },
        inject: [MessageBrokerClientOptions],
    },
];
