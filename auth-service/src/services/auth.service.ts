import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { of, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { filterUndefinedAndThrowError } from '../operators/errors.operators';
import { LoggerProvider } from '../logger/logger.provider';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { AppService } from '../app.service';
import { JwtPayloadMessage } from '../messages/jwt-payload.message';
import { AuthResponseMessage } from '../messages/auth-response.message';
import { AppConfigService } from '../config/app-config.service';
import { User } from '../database/schemas/user.schema';

@Injectable()
export class AuthService {
    private readonly logger: LoggerInstance<AuthService>;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: AppConfigService,
        private readonly appService: AppService,
        private readonly loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<AuthService>(AuthService);
    }

    public createUserToken(
        loggerTag: string,
        password: string,
    ): (source: Observable<User>) => Observable<AuthResponseMessage> {
        return (source: Observable<User>) =>
            source.pipe(
                filterUndefinedAndThrowError('User not found', () =>
                    this.logger.error(LoggerOperations.USER_NOT_FOUND, loggerTag),
                ),
                switchMap((user) => {
                    if (!this.verifyPassword(password, user.password)) {
                        this.logger.error(LoggerOperations.INVALID_CREDENTIALS, loggerTag);
                        return throwError(new RpcException('Invalid Password'));
                    }

                    this.logger.info(LoggerOperations.LOGIN_SUCCESSFUL, loggerTag);
                    return this.createToken(user);
                }),
            );
    }

    public validateToken(token: string): JwtPayloadMessage {
        const payload: JwtPayloadMessage = this.jwtService.decode(token) as JwtPayloadMessage;

        if (!payload || !payload._id) throw new RpcException('Malformed payload');

        // jwt generated property
        delete payload.iat;

        return payload;
    }

    public verifyPassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    public createToken(user: User): Observable<AuthResponseMessage> {
        const payload: JwtPayloadMessage = {
            _id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = this.jwtService.sign(payload);
        return of({ user, token, auth_method: this.configService.authMethod });
    }
}
