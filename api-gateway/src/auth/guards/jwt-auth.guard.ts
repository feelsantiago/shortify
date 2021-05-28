import { ExecutionContext, Injectable } from '@nestjs/common';
import { LoggerInstance } from 'feel-logger';
import { Request } from 'express';
import { ErrorService } from '../../shared/services/error.service';
import { GrpcClientService } from '../../grpc/services/grpc-client.service';
import { LoggerOperations } from '../../logger/utils/logger-operations';
import { LoggerProvider } from '../../logger/logger.provider';

/**
 * This guards wraps native JWT guard for custom authentications methods
 */
@Injectable()
export class JwtAuthGuard {
    private logger: LoggerInstance<JwtAuthGuard>;

    constructor(
        private readonly gRpcClient: GrpcClientService,
        private readonly errorService: ErrorService,
        loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<JwtAuthGuard>(JwtAuthGuard);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        if (!req.token) return false;

        const { tag, metadata } = req.loggerData;

        try {
            this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_ATTEMPT, tag);
            const user = await this.gRpcClient.auth.validate({ token: req.token }, metadata).toPromise();
            this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_SUCCESSFUL, tag);

            req.user = user;

            return true;
        } catch (error) {
            const [message, stack] = this.errorService.getMessage(error);
            this.logger.error(message, tag, stack);
            return false;
        }
    }
}
