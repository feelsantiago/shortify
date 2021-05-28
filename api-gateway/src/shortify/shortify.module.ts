import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc/grpc-client.module';
import { shortifyProviders } from './shortify.provider';
import { ShortifyService } from './services/shortify.service';
import { ShortifyController } from './shortify.controller';
import { SharedModule } from '../shared/shared.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
    imports: [GrpcClientModule, SharedModule, LoggerModule],
    controllers: [ShortifyController],
    providers: [...shortifyProviders],
    exports: [ShortifyService],
})
export class ShortifyModule {}
