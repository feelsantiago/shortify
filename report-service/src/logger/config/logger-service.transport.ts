import Transport from 'winston-transport';
import { ClientProxy } from '@nestjs/microservices';

export interface TransportInfo {
    level: string;
    message: string;
    label: string;
    timestamp: string;
    metadata: {
        [key: string]: unknown;
    };
}

export interface LoggerServiceTransportOptions {
    client: ClientProxy;
}

export class LoggerServiceTransport extends Transport {
    private readonly client: ClientProxy;

    constructor({ client }: LoggerServiceTransportOptions) {
        super();
        this.client = client;
    }

    public log(info: TransportInfo, callback?: () => void): void {
        const _info = info;
        setImmediate(() => {
            this.emit('logged', _info);
        });

        _info.level = info.level.toLowerCase();
        this.client.emit('log', _info);

        if (callback) {
            callback();
        }
    }
}
