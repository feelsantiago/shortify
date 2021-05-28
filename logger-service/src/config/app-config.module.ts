import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { configOptions } from './config-options';

@Module({
    imports: [ConfigModule.forRoot(configOptions)],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}
