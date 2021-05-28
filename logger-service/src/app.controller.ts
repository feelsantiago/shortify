import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoggerInstance } from 'feel-logger';
import { AppService } from './app.service';
import { AppConfigService } from './config/app-config.service';
import { LogRepository } from './database/repositories/log.repository';
import { LogMessage } from './messages/log.messages';
import { AppProvider } from './app.provider';

@Controller()
export class AppController {
    private readonly logger: LoggerInstance<AppController>;

    constructor(
        private readonly configService: AppConfigService,
        private readonly repositoryService: LogRepository,
        private readonly appService: AppService,
        loggerProvider: AppProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance(AppController);
    }

    @EventPattern('log')
    public log(@Payload() data: LogMessage): void {
        const { label: service, level, message, timestamp } = data;
        const flatMetadata = this.appService.flatMetadata(data.metadata);
        const [context, tag, metadata] = this.appService.getMetadataContextAndTag(flatMetadata);

        const formattedLog = `[Log Event] - Incoming message from: [${service} - ${context}] - Tag: [${tag}] - [${level}]: ${message}`;

        if (level === 'log') {
            this.logger.log(level, formattedLog);
        } else {
            this.logger[level](formattedLog, { ...metadata });
        }

        if (this.configService.persistToDb) {
            const log = { service, tag, level, message, context, timestamp, metadata };
            this.repositoryService.create(log).subscribe();
        }
    }
}
