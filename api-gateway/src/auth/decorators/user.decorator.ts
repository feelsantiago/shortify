import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserMessage } from '../messages/user.message';

export const User = createParamDecorator((data: keyof UserMessage, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const { user } = request;

    return data ? user && user[data] : user;
});
