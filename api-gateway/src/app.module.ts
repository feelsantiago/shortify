import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { ShortifyModule } from './shortify/shortify.module';
import { LoggerInfoMiddleware } from './middlewares/logger-info.middleware';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';
import { LoggerModule } from './logger/logger.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';

@Module({
    imports: [AuthModule, AppConfigModule, ShortifyModule, ClientModule, SharedModule, LoggerModule],
    controllers: [AppController],
    providers: [ExceptionInterceptor],
    exports: [ExceptionInterceptor],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerInfoMiddleware).forRoutes('*');
    }
}
