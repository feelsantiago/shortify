import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LoggerInstance } from 'feel-logger';
import { LoggerProvider } from '../logger/logger.provider';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { ClientRepository } from '../database/repositories/client.repository';
import { Client } from '../database/schemas/client';
import { ReportEventPayload } from '../types';

@Controller()
export class ClientController {
    private readonly logger: LoggerInstance<ClientController>;

    constructor(private readonly clientRepository: ClientRepository, loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance<ClientController>(ClientController);
    }

    @EventPattern('create_client')
    public create(data: ReportEventPayload<Client>): void {
        this.logger.info(LoggerOperations.CLIENT_REPORT_OPERATION_START, data.tag, `'Id': ${data._id}`);
        this.logger.info(LoggerOperations.DATABASE_CREATE_ATTEMPT, data.tag);

        this.clientRepository.createUser(data).subscribe(() => {
            this.logger.info(LoggerOperations.DATABASE_CREATE_SUCCESSFUL, data.tag);
            this.logger.info(LoggerOperations.CLIENT_REPORT_OPERATION_SUCCESSFUL, data.tag);
        });
    }
}
