import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { GrpcClientOptions } from './options/grpc-client-options';
import { configOptions } from './config-options';

@Module({
    imports: [ConfigModule.forRoot(configOptions)],
    providers: [GrpcClientOptions, AppConfigService],
    exports: [AppConfigService, GrpcClientOptions],
})
export class AppConfigModule {}
