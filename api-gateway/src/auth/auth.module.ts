import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GrpcClientModule } from '../grpc/grpc-client.module';
import { authProviders } from './auth.provider';
import { SecretGuard } from './guards/secret.guard';
import { LoggerModule } from '../logger/logger.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [GrpcClientModule, LoggerModule, SharedModule],
    controllers: [AuthController],
    providers: [...authProviders, JwtAuthGuard, RolesGuard, SecretGuard],
    exports: [...authProviders, JwtAuthGuard, RolesGuard, SecretGuard],
})
export class AuthModule {}
