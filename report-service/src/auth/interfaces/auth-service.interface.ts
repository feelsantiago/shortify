import { Observable } from 'rxjs';
import { Metadata } from 'grpc';
import { UserMessage } from '../messages/user.message';
import { AuthRequestMessage } from '../messages/auth-request.message';
import { AuthResponseMessage } from '../messages/auth-response.message';
import { TokenRequestMessage } from '../messages/token-request.message';

export interface IAuthService {
    create(user: UserMessage, metadata?: Metadata): Observable<UserMessage>;
    login(request: AuthRequestMessage, metadata?: Metadata): Observable<AuthResponseMessage>;
    validate(request: TokenRequestMessage, metadata?: Metadata): Observable<UserMessage>;
}
