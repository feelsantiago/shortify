import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EnvConfig {
    [key: string]: string;
}
@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    public get isRunningOnDocker(): boolean {
        return !!this.configService.get<string>('DOCKER');
    }

    public get databaseUrl(): string {
        return this.configService.get<string>('DATABASE_URL');
    }

    public get serverUrl(): string {
        return this.configService.get<string>('SERVER_URL');
    }

    public get authMethod(): string {
        return this.configService.get<string>('AUTH_METHOD');
    }

    public get persistToDb(): boolean {
        return this.configService.get<boolean>('LOGGER_PERSIST_DATA_TO_DB');
    }

    public get persistDataToFile(): boolean {
        const value = this.configService.get<string>('LOGGER_SEND_TO_SERVICE');
        return value === 'true';
    }

    public get amqpURl(): string {
        return this.configService.get<string>('AMQP_URL');
    }

    public get amqpQueue(): string {
        return this.configService.get<string>('AMQP_LOGGER_QUEUE');
    }
}
