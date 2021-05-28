import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    public get authServiceUrl(): string {
        return this.configService.get<string>('AUTH_SERVICE_URL');
    }

    public get isRunningOnDocker(): boolean {
        return !!this.configService.get<string>('DOCKER');
    }

    public get serviceName(): string {
        return this.configService.get<string>('SERVICE_NAME');
    }

    public get databaseUrl(): string {
        return this.configService.get<string>('DATABASE_URL');
    }

    public get serverUrl(): string {
        return this.configService.get<string>('SERVER_URL');
    }

    public get persistToFile(): boolean {
        const value = this.configService.get<string>('LOGGER_PERSIST_DATA_TO_FILE');
        return value === 'true';
    }

    public get sendToService(): boolean {
        const value = this.configService.get<string>('LOGGER_SEND_TO_SERVICE');
        return value === 'true';
    }

    public get tagLength(): number {
        return Number.parseInt(this.configService.get<string>('TAG_LENGTH'), 10);
    }

    public get tagCharacters(): string {
        return this.configService.get<string>('TAG_CHARACTERS');
    }

    public get amqpUrl(): string {
        return this.configService.get<string>('AMQP_URL');
    }

    public get amqpLoggerQueue(): string {
        return this.configService.get<string>('AMQP_LOGGER_QUEUE');
    }

    public get amqpReportQueue(): string {
        return this.configService.get<string>('AMQP_REPORT_QUEUE');
    }
}
