import { Provider } from '@nestjs/common';
import { GrpcClientService } from '../grpc/services/grpc-client.service';
import { ShortifyService } from './services/shortify.service';
import { IShortifyService } from './interfaces/shortify-service.interface';

export const shortifyProviders: Array<Provider> = [
    {
        provide: ShortifyService,
        useFactory: (grpcClient: GrpcClientService): IShortifyService => grpcClient.shortify,
        inject: [GrpcClientService],
    },
];
