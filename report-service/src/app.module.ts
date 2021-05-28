import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ClientModule } from './client/client.module';
import { AppConfigModule } from './config/app-config.module';
import { ShortifyModule } from './shortify/shortify.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { LoggerMetadataMiddleware } from './middlewares/logger-info.middleware';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [
        AppConfigModule,
        DatabaseModule,
        LoggerModule,
        AuthModule,
        ClientModule,
        ShortifyModule,
        SharedModule,
        TagsModule,
    ],
    providers: [ExceptionInterceptor],
    exports: [ExceptionInterceptor],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMetadataMiddleware).forRoutes('*');
    }
}
