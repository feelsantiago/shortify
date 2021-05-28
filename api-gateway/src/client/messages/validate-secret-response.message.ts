import { Client } from './client.message';

export interface ValidateSecretResponseMessage {
    result: boolean;
    client: Client;
}
