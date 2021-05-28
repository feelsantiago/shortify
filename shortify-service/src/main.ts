import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ShortifyPackage } from 'shortify-proto-packages';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { HttpLoggerService } from './logger/config/http-logger.service';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: ShortifyPackage.name,
            url: ShortifyPackage.url,
            protoPath: ShortifyPackage.path,
            loader: {
                keepCase: true,
            },
        },
    });

    const logger = app.get(HttpLoggerService);
    app.useGlobalInterceptors(app.get(ExceptionInterceptor));

    await app.listen(() => logger.write('[SHORTIFY SERVICE] - Running...'));
}

void bootstrap();
