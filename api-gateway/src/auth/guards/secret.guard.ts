import { ExecutionContext, Injectable } from '@nestjs/common';
import { LoggerInstance } from 'feel-logger';
import { Request } from 'express';
import { GrpcClientService } from '../../grpc/services/grpc-client.service';
import { LoggerOperations } from '../../logger/utils/logger-operations';
import { LoggerProvider } from '../../logger/logger.provider';
import { ErrorService } from '../../shared/services/error.service';

/**
 * This guards verify client secret auth
 */
@Injectable()
export class SecretGuard {
    private readonly logger: LoggerInstance<SecretGuard>;

    constructor(
        private readonly gRpcClient: GrpcClientService,
        private readonly errorService: ErrorService,
        loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<SecretGuard>(SecretGuard);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        const { tag, metadata } = req.loggerData;

        if (!('secret' in req.body)) return false;

        try {
            const { secret } = req.body as { secret: string };

            this.logger.info(LoggerOperations.CALL_CLIENT_SERVICE_ATTEMPT, tag);
            const validation = await this.gRpcClient.client.validateSecret({ secret }, metadata).toPromise();
            this.logger.info(LoggerOperations.CALL_CLIENT_SERVICE_SUCCESSFUL, tag);

            if (!validation.result) return false;

            req.client = validation.client;
            return true;
        } catch (error) {
            const [message, stack] = this.errorService.getMessage(error);
            this.logger.error(message, tag, stack);
            return false;
        }
    }
}
