import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { GrpcClientService } from './services/grpc-client.service';

@Module({
    imports: [AppConfigModule],
    providers: [GrpcClientService],
    exports: [GrpcClientService],
})
export class GrpcClientModule {}
