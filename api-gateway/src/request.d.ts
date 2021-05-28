/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import { UserMessage } from './auth/messages/user.message';
import { Client } from './client/messages/client.message';
import { LoggerData } from './interfaces/logger-data.interface';

declare global {
    namespace Express {
        export interface Request {
            user: UserMessage;
            client: Client;
            token: string;
            loggerData: LoggerData;
        }
    }
}
/* eslint-enable @typescript-eslint/no-unused-vars, no-unused-vars */
