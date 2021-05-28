import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { MessageBrokerClientOptions } from './options/message-broker-client-options';
import { configOptions } from './config-options';

@Module({
    imports: [ConfigModule.forRoot(configOptions)],
    providers: [AppConfigService, MessageBrokerClientOptions],
    exports: [AppConfigService, MessageBrokerClientOptions],
})
export class AppConfigModule {}
