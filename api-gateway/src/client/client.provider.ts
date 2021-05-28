import { Provider } from '@nestjs/common';
import { GrpcClientService } from '../grpc/services/grpc-client.service';
import { ClientService } from './services/client.service';
import { IClientService } from './interfaces/client-service.interface';

export const clientProviders: Array<Provider> = [
    {
        provide: ClientService,
        useFactory: (grpcClient: GrpcClientService): IClientService => grpcClient.client,
        inject: [GrpcClientService],
    },
];
