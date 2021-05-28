import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.create(AppModule);
    const appConfigService = app.get(AppConfigService);

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [appConfigService.amqpURl],
            queue: appConfigService.amqpQueue,
            queueOptions: {
                durable: false,
            },
        },
    });

    await app.startAllMicroservicesAsync();
    await app.listen(3002);
};

void bootstrap();
