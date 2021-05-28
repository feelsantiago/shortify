import { UserMessage } from './user.message';

export interface AuthResponseMessage {
    user: UserMessage;
    token: string;
    auth_method: string;
}
