import { User } from '../database/schemas/user.schema';

export interface AuthResponseMessage {
    user: User;
    token: string;
    auth_method: string;
}
