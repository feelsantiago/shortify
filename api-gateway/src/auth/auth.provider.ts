import { Provider } from '@nestjs/common';
import { GrpcClientService } from '../grpc/services/grpc-client.service';
import { AuthService } from './services/auth.service';
import { IAuthService } from './interfaces/auth-service.interface';

export const authProviders: Array<Provider> = [
    {
        provide: AuthService,
        useFactory: (grpcClient: GrpcClientService): IAuthService => grpcClient.auth,
        inject: [GrpcClientService],
    },
];
