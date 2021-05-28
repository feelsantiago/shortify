import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app.module';
import { token } from './middlewares/token.middleware';
import { GrpcClientOptions } from './config/options/grpc-client-options';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { HttpLoggerService } from './logger/config/http-logger.service';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const httpLogger = app.get(HttpLoggerService);

    // middleware
    app.use(helmet());
    app.use(morgan('combined', { stream: httpLogger }));
    app.use(cookieParser());
    app.use(token);

    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            validationError: { target: false, value: true },
        }),
    );

    app.useGlobalInterceptors(app.get(ExceptionInterceptor));

    // services register
    const gRpcClientOptions = app.get(GrpcClientOptions);

    app.connectMicroservice(gRpcClientOptions.authService);
    app.connectMicroservice(gRpcClientOptions.shortifyService);
    app.connectMicroservice(gRpcClientOptions.clientService);

    await app.listen(3000);
}

void bootstrap();
