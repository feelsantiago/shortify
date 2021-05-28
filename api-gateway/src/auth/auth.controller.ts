import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { AuthService } from './services/auth.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { LoggerInfo } from '../decorators/logger-info.decorator';
import { LoggerData } from '../interfaces/logger-data.interface';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { UserMessage } from './messages/user.message';
import { AuthResponseMessage } from './messages/auth-response.message';
import { LoggerProvider } from '../logger/logger.provider';

@Controller('auth')
export class AuthController {
    private readonly logger: LoggerInstance<AuthController>;

    constructor(private readonly authService: AuthService, loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance<AuthController>(AuthController);
    }

    @Post('register')
    public register(@Body() body: UserRegisterDto, @LoggerInfo() loggerData: LoggerData): Observable<UserMessage> {
        const { tag, metadata } = loggerData;
        this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_ATTEMPT, tag);

        return this.authService
            .create(body, metadata)
            .pipe(tap(() => this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_SUCCESSFUL, tag)));
    }

    @Post('login')
    public login(@Body() body: UserLoginDto, @LoggerInfo() loggerData: LoggerData): Observable<AuthResponseMessage> {
        const { tag, metadata } = loggerData;
        this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_ATTEMPT, tag);

        return this.authService
            .login(body, metadata)
            .pipe(tap(() => this.logger.info(LoggerOperations.CALL_AUTH_SERVICE_SUCCESSFUL, tag)));
    }
}
