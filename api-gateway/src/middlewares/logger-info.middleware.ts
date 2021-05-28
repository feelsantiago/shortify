import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerProvider } from '../logger/logger.provider';

@Injectable()
export class LoggerInfoMiddleware implements NestMiddleware {
    constructor(private readonly loggerProvider: LoggerProvider) {}

    public use(req: Request, res: Response, next: () => void): void {
        const metadata = { tag: this.loggerProvider.createLoggerTag(), metadata: undefined };

        req.loggerData = metadata;
        next();
    }
}
