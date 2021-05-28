import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import morgan from 'morgan';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { token } from './middlewares/token.middleware';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { HttpLoggerService } from './logger/config/http-logger.service';
import { AppConfigService } from './config/app-config.service';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const appConfigService = app.get(AppConfigService);

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [appConfigService.amqpUrl],
            queue: appConfigService.amqpReportQueue,
            queueOptions: { durable: false },
        },
    });

    app.setGlobalPrefix('api/v1');
    const logger = app.get(HttpLoggerService);

    app.use(helmet());
    app.use(morgan('combined', { stream: logger }));
    app.use(token);

    app.useGlobalInterceptors(app.get(ExceptionInterceptor));

    app.startAllMicroservices(() => logger.write('[REPORT-SERVICE] - Running...'));
    await app.listen(3001);
}
void bootstrap();
