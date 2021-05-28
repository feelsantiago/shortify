import { Injectable } from '@nestjs/common';
import { ClientGrpc, ClientGrpcProxy } from '@nestjs/microservices';
import { IAuthService } from '../../auth/interfaces/auth-service.interface';
import { GrpcClientOptions } from '../../config/options/grpc-client-options';

@Injectable()
export class GrpcClientService {
    // Auth
    private gRpcAuthClient: ClientGrpc;

    private authService: IAuthService;

    constructor(private readonly gRpcClientOptions: GrpcClientOptions) {
        this.gRpcAuthClient = new ClientGrpcProxy(gRpcClientOptions.authService.options);
    }

    public get auth(): IAuthService {
        if (!this.authService) {
            this.authService = this.gRpcAuthClient.getService<IAuthService>('AuthService');
        }

        return this.authService;
    }
}
