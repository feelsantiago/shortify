import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const LoggerInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const { loggerData } = request;

    return loggerData;
});
