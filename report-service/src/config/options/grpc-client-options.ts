import { Transport, GrpcOptions } from '@nestjs/microservices';
import { AuthPackage } from 'shortify-proto-packages';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config.service';

@Injectable()
export class GrpcClientOptions {
    constructor(private readonly configService: AppConfigService) {}

    public get authService(): GrpcOptions {
        const { url, port, name, path } = AuthPackage;
        const serviceUrl = this.configService.isRunningOnDocker ? `${name}:${port}` : url;
        return this.createOptions(serviceUrl, name, path);
    }

    private createOptions(url: string, packageName: string, path: string): GrpcOptions {
        const options: GrpcOptions = {
            transport: Transport.GRPC,
            options: {
                url,
                package: packageName,
                protoPath: path,
                loader: {
                    keepCase: true,
                },
            },
        };

        return options;
    }
}
