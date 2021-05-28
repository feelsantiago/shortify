import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc/grpc-client.module';
import { clientProviders } from './client.provider';
import { ClientService } from './services/client.service';
import { ClientController } from './client.controller';
import { LoggerModule } from '../logger/logger.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [GrpcClientModule, LoggerModule, SharedModule],
    controllers: [ClientController],
    providers: [...clientProviders],
    exports: [ClientService],
})
export class ClientModule {}
