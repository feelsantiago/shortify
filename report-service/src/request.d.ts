// TODO: resolve eslint disable
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerData } from './interfaces/logger-data.interface';
import { UserMessage } from './auth/messages/user.message';
import { ReportEventPayload } from './types';
import { Client } from './database/schemas/client';

declare global {
    namespace Express {
        export interface Request {
            user: UserMessage;
            client: ReportEventPayload<Client>;
            token: string;
            loggerData: LoggerData;
        }
    }
}
