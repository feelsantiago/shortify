import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { AppService } from '../app.service';
import { LoggerModule } from '../logger/logger.module';
import { JwtPayloadMessage } from '../messages/jwt-payload.message';
import { AppConfigModule } from '../config/app-config.module';
import { AuthService } from './auth.service';
import { User } from '../database/schemas/user.schema';

describe('AuthService', () => {
    let authService: AuthService;
    const jwtRegex = /^[\w=-]+\.[\w=-]+\.?[\w+./=-]*$/;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secretOrPrivateKey: 'test@secrete',
                }),
                AppConfigModule,
                LoggerModule,
            ],
            controllers: [],
            providers: [AuthService, AppService],
        }).compile();

        authService = app.get<AuthService>(AuthService);
    });

    describe('createToken', () => {
        it('Should return a "AuthResponseMessage Object"', () => {
            const user = {
                _id: '1',
                name: 'test user',
                email: 'email@test.com',
                role: 'test',
            };

            authService.createToken(user as User).subscribe((result) => {
                expect(result).toHaveProperty('token');
                expect(result.token.search(jwtRegex));
            });
        });
    });

    describe('validateToken', () => {
        it('Should return a "JwtPayloadMessage Object"', () => {
            const token =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiZW1haWwiOiJlbWFpbEB0ZXN0LmNvbSIsInJvbGUiOiJ0ZXN0IiwiaWF0IjoxNTU4MzYxMjk0fQ.1pXsFNKgQK3sW1IwUIhfRnUrHMSDDGdY0gQGVg53nS4';

            const payload: JwtPayloadMessage = {
                _id: '1',
                email: 'email@test.com',
                role: 'test',
            };

            const result = authService.validateToken(token);
            expect(result).toEqual(payload);
        });
    });

    describe('validateToken-error', () => {
        it('Should throw a exception "Malformed Payload"', () => {
            const token = 'invalid-token';
            expect(() => authService.validateToken(token)).toThrow(RpcException);
        });
    });
});
