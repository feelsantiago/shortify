import { Injectable } from '@nestjs/common';
import { ClientGrpc, ClientGrpcProxy } from '@nestjs/microservices';
import { IAuthService } from '../../auth/interfaces/auth-service.interface';
import { IShortifyService } from '../../shortify/interfaces/shortify-service.interface';
import { GrpcClientOptions } from '../../config/options/grpc-client-options';
import { IClientService } from '../../client/interfaces/client-service.interface';

@Injectable()
export class GrpcClientService {
    // Auth
    private gRpcAuthClient: ClientGrpc;

    private authService: IAuthService;

    // Shortify
    private gRpcShortifyClient: ClientGrpc;

    private shortifyService: IShortifyService;

    // Client
    private gRpcClientClient: ClientGrpc;

    private clientService: IClientService;

    constructor(private readonly gRpcClientOptions: GrpcClientOptions) {
        this.gRpcAuthClient = new ClientGrpcProxy(gRpcClientOptions.authService.options);
        this.gRpcShortifyClient = new ClientGrpcProxy(gRpcClientOptions.shortifyService.options);
        this.gRpcClientClient = new ClientGrpcProxy(gRpcClientOptions.clientService.options);
    }

    public get auth(): IAuthService {
        if (!this.authService) {
            this.authService = this.gRpcAuthClient.getService<IAuthService>('AuthService');
        }

        return this.authService;
    }

    public get shortify(): IShortifyService {
        if (!this.shortifyService) {
            this.shortifyService = this.gRpcShortifyClient.getService<IShortifyService>('ShortifyService');
        }

        return this.shortifyService;
    }

    public get client(): IClientService {
        if (!this.clientService) {
            this.clientService = this.gRpcClientClient.getService<IClientService>('ClientService');
        }

        return this.clientService;
    }
}
