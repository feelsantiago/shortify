import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Client as IClient } from '../../client/messages/client.message';

export const Client = createParamDecorator((data: keyof IClient, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const { client } = request;

    return data ? client && client[data] : client;
});
