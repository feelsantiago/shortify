import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from 'grpc';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoggerInstance } from 'feel-logger';
import { UserMessage } from './messages/user.message';
import { AuthService } from './services/auth.service';
import { UserRepository } from './database/user.repository';
import { AuthRequestMessage } from './messages/auth-request.message';
import { AuthResponseMessage } from './messages/auth-response.message';
import { TokenRequestMessage } from './messages/token-request.message';
import { LoggerOperations } from './logger/utils/logger-operations';
import { ReportMessageBrokerService } from './report/services/report-message-broker.service';
import { User } from './database/schemas/user.schema';
import { AppService } from './app.service';
import { LoggerProvider } from './logger/logger.provider';
import { filterUndefinedAndThrowError } from './operators/errors.operators';

/**
 * Define the proto service name to reflect controllers methods
 */
const ProtoService = 'AuthService';

@Controller()
export class AppController {
    private readonly logger: LoggerInstance<AppController>;

    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository,
        private readonly loggerProvider: LoggerProvider,
        private readonly reportService: ReportMessageBrokerService,
    ) {
        this.logger = loggerProvider.createLoggerInstance<AppController>(AppController);
    }

    @GrpcMethod(ProtoService)
    public create(user: UserMessage, metadata: Metadata): Observable<User> {
        const loggerTag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.CREATE_USER_OPERATION, loggerTag, `'Email': ${user.email}`);

        this.logger.info(LoggerOperations.DATABASE_CREATE_ATTEMPT, loggerTag);

        return this.userRepository.create(user).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_CREATE_SUCCESSFUL, loggerTag)),
            tap((result: User) => this.reportService.sendUser({ ...result.toJSON(), tag: loggerTag })),
        );
    }

    @GrpcMethod(ProtoService)
    public login(request: AuthRequestMessage, metadata: Metadata): Observable<AuthResponseMessage> {
        const loggerTag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.LOGIN_OPERATION, `'Email': ${request.email}`, loggerTag);

        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerTag);
        return this.userRepository.getUserByEmailWithPassword(request.email).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, loggerTag)),
            this.authService.createUserToken(loggerTag, request.password),
        );
    }

    @GrpcMethod(ProtoService)
    public validate(request: TokenRequestMessage, metadata: Metadata): Observable<User> {
        const loggerTag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.VALIDATE_OPERATION, loggerTag);

        const result = this.authService.validateToken(request.token);

        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerTag, `'Id': ${result._id}`);
        return this.userRepository.getUserById(result._id).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, loggerTag)),
            filterUndefinedAndThrowError('Invalid token', () =>
                this.logger.error(LoggerOperations.USER_NOT_FOUND, loggerTag),
            ),
        );
    }
}
