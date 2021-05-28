import { ClientMessage } from './client.message';

export interface ValidateSecretResponseMessage {
    result: boolean;
    client: ClientMessage;
}
