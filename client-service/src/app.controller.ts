import { Controller } from '@nestjs/common';
import { Metadata } from 'grpc';
import { GrpcMethod } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { SecretService } from './services/secret.service';
import { ClientRepository } from './database/repositories/client.repository';
import { ValidateSecretRequestMessage } from './messages/validate-secret-request.message';
import { ValidateSecretResponseMessage } from './messages/validate-secret-response.message';
import { LoggerOperations } from './logger/utils/logger-operations';
import { ReportMessageBrokerService } from './report/services/report-message-broker.service';
import { ClientMessage } from './messages/client.message';
import { Client } from './database/schemas/client';
import { LoggerProvider } from './logger/logger.provider';

const ProtoService = 'ClientService';

@Controller()
export class AppController {
    private readonly logger: LoggerInstance<AppController>;

    constructor(
        private readonly secretService: SecretService,
        private readonly repositoryService: ClientRepository,
        private readonly loggerProvider: LoggerProvider,
        private readonly reportService: ReportMessageBrokerService,
    ) {
        this.logger = loggerProvider.createLoggerInstance<AppController>(AppController);
    }

    @GrpcMethod(ProtoService)
    public create(data: ClientMessage, metadata: Metadata): Observable<unknown> {
        const tag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.CREATE_OPERATION, tag, `'User': ${data.user_id}`);
        const client = { ...data };

        const id = new Types.ObjectId();
        client.secret = this.secretService.create(id);
        client._id = id.toHexString();

        this.logger.info(LoggerOperations.DATABASE_CREATE_ATTEMPT, tag);
        return this.repositoryService.create(client).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_CREATE_SUCCESSFUL, tag)),
            tap((result: Client) => this.reportService.sendClient({ tag, ...result.toObject() })),
        );
    }

    @GrpcMethod(ProtoService)
    public validateSecret(
        data: ValidateSecretRequestMessage,
        metadata: Metadata,
    ): Observable<ValidateSecretResponseMessage> {
        const tag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.VALIDATE_SECRETE_OPERATION, tag, `'Secret': ${data.secret}`);

        const validation = this.secretService.validate(data.secret, tag);
        if (!validation.result) {
            this.logger.error(LoggerOperations.SECRET_VALIDATION_FAILED, tag);
            return of({ client: undefined, result: false });
        }

        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, tag, `'Id': ${validation._id}`);
        return this.repositoryService.getClientById(validation._id).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, tag)),
            map((client: Client) => {
                if (!client) {
                    return { client: undefined, result: false };
                }

                return { client: client.toJSON() as ClientMessage, result: true };
            }),
        );
    }
}
