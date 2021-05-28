import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { Metadata } from 'grpc';
import { LoggerProvider } from '../logger/logger.provider';

@Injectable()
export class LoggerMetadataMiddleware implements NestMiddleware {
    constructor(private readonly loggerProvider: LoggerProvider) {}

    public use(req: Request, res: Response, next: () => void): void {
        const tag = this.loggerProvider.createLoggerTag();
        const metadata = new Metadata();

        metadata.add('tag', tag);

        req.loggerData = { tag, metadata };
        next();
    }
}
