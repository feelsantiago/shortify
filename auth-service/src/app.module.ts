import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './services/auth.service';
import { LoggerModule } from './logger/logger.module';
import { ReportModule } from './report/report.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { AppService } from './app.service';
import { ErrorService } from './services/error.service';

@Module({
    imports: [
        AppConfigModule,
        DatabaseModule,
        LoggerModule,
        ReportModule,
        JwtModule.register({
            secretOrPrivateKey: 'auth-service@secret@751953',
            signOptions: {
                // expiresIn: 3600
            },
        }),
    ],
    controllers: [AppController],
    providers: [AuthService, ExceptionInterceptor, AppService, ErrorService],
})
export class AppModule {}
