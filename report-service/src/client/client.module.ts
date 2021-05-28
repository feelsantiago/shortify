import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
    imports: [DatabaseModule, LoggerModule],
    controllers: [ClientController],
})
export class ClientModule {}
