import { Observable } from 'rxjs';
import { Metadata } from 'grpc';
import { IClientService } from '../interfaces/client-service.interface';
import { ValidateSecretRequestMessage } from '../messages/validate-secret-request.message';
import { ValidateSecretResponseMessage } from '../messages/validate-secret-response.message';
import { Client } from '../messages/client.message';

/**
 * Mock class, the only purpose is to serve as token for dependency injection
 */
export abstract class ClientService implements IClientService {
    public create(_data: Client, _metadata?: Metadata): Observable<Client> {
        throw new Error('Method not implemented.');
    }

    public validateSecret(
        _data: ValidateSecretRequestMessage,
        _metadata?: Metadata,
    ): Observable<ValidateSecretResponseMessage> {
        throw new Error('Method not implemented.');
    }
}
