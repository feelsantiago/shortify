import { Observable } from 'rxjs';
import { Metadata } from 'grpc';

import { Client } from '../messages/client.message';
import { ValidateSecretRequestMessage } from '../messages/validate-secret-request.message';
import { ValidateSecretResponseMessage } from '../messages/validate-secret-response.message';

export interface IClientService {
    create(data: Client, metadata?: Metadata): Observable<Client>;
    validateSecret(data: ValidateSecretRequestMessage, metadata?: Metadata): Observable<ValidateSecretResponseMessage>;
}
