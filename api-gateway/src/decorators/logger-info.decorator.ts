import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Metadata } from 'grpc';
import { Request } from 'express';

export const LoggerInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const { tag } = request.loggerData;

    const metadata: Metadata = new Metadata();
    metadata.add('tag', tag);

    return { tag, metadata };
});
