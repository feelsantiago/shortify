import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { AppProvider } from './app.provider';
import { AppService } from './app.service';

@Module({
    imports: [DatabaseModule, AppConfigModule],
    controllers: [AppController],
    providers: [AppService, AppProvider],
    exports: [AppProvider],
})
export class AppModule {}
