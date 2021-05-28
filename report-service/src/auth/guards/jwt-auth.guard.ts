import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LoggerInstance } from 'feel-logger';
import { ErrorService } from '../../shared/services/error.service';
import { LoggerProvider } from '../../logger/logger.provider';
import { GrpcClientService } from '../../grpc/services/grpc-client.service';
import { LoggerOperations } from '../../logger/utils/logger-operations';

/**
 * This guards wraps native JWT guard for custom authentications methods
 */
@Injectable()
export class JwtAuthGuard {
    private logger: LoggerInstance<JwtAuthGuard>;

    constructor(
        private readonly gRpcClient: GrpcClientService,
        loggerProvider: LoggerProvider,
        private readonly errorService: ErrorService,
    ) {
        this.logger = loggerProvider.createLoggerInstance<JwtAuthGuard>(JwtAuthGuard);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        if (!req.token) return false;

        try {
            this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_ATTEMPT, req.loggerData.tag);
            const user = await this.gRpcClient.auth.validate({ token: req.token }, req.loggerData.metadata).toPromise();
            this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_SUCCESSFUL, req.loggerData.tag);

            req.user = { ...user };

            return true;
        } catch (error) {
            const [message, stack] = this.errorService.getMessage(error);
            this.logger.error(message, req.loggerData.tag, stack);
            return false;
        }
    }
}
