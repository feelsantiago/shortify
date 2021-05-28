import { NestFactory } from '@nestjs/core';
import { ClientPackage } from 'shortify-proto-packages';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { HttpLoggerService } from './logger/config/http-logger.service';

const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: ClientPackage.name,
            url: ClientPackage.url,
            protoPath: ClientPackage.path,
            loader: {
                keepCase: true,
            },
        },
    });

    const logger = app.get(HttpLoggerService);
    app.useGlobalInterceptors(app.get(ExceptionInterceptor));

    await app.listen(() => logger.write('[Client SERVICE] - Running...'));
};
void bootstrap();
