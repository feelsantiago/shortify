import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthPackage } from 'shortify-proto-packages';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { HttpLoggerService } from './logger/config/http-logger.service';

const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: AuthPackage.name,
            url: AuthPackage.url,
            protoPath: AuthPackage.path,
            loader: {
                keepCase: true,
            },
        },
    });

    const logger = app.get(HttpLoggerService);
    app.useGlobalInterceptors(app.get(ExceptionInterceptor));

    await app.listen(() => logger.write(`[AUTH SERVICE] - Running | URL: ${AuthPackage.url}`));
};
void bootstrap();
