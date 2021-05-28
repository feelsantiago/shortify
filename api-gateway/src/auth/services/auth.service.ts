import { Observable } from 'rxjs';
import { Metadata } from 'grpc';
import { IAuthService } from '../interfaces/auth-service.interface';
import { UserMessage } from '../messages/user.message';
import { AuthRequestMessage } from '../messages/auth-request.message';
import { AuthResponseMessage } from '../messages/auth-response.message';
import { TokenRequestMessage } from '../messages/token-request.message';

export class AuthService implements IAuthService {
    public create(_user: UserMessage, _metadata?: Metadata): Observable<UserMessage> {
        throw new Error('Method not implemented.');
    }

    public login(_request: AuthRequestMessage, _metadata?: Metadata): Observable<AuthResponseMessage> {
        throw new Error('Method not implemented.');
    }

    public validate(_request: TokenRequestMessage, _metadata?: Metadata): Observable<UserMessage> {
        throw new Error('Method not implemented.');
    }
}
