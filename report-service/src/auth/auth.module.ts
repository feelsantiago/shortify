import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GrpcClientModule } from '../grpc/grpc-client.module';
import { authProviders } from './auth.provider';
import { LoggerModule } from '../logger/logger.module';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [GrpcClientModule, DatabaseModule, LoggerModule, SharedModule],
    providers: [...authProviders, JwtAuthGuard, RolesGuard],
    controllers: [AuthController],
    exports: [...authProviders, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
