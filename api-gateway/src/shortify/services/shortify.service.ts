import { Observable } from 'rxjs';
import { Metadata } from 'grpc';
import { IShortifyService } from '../interfaces/shortify-service.interface';
import { ShortifyRequestMessage } from '../messages/shortify-request.message';
import { ShortifyResponseMessage } from '../messages/shortify-response.message';
import { RedirectRequestMessage } from '../messages/redirect-request.message';
import { RedirectResponseMessage } from '../messages/redirect-response.message';
import { LinkRequestMessage } from '../messages/link-request.message';
import { LinkMessage } from '../messages/link.message';

/**
 * Mock class, the only purpose is to serve as token for dependency injection
 */
export abstract class ShortifyService implements IShortifyService {
    public shortify(_data: ShortifyRequestMessage, _metadata?: Metadata): Observable<ShortifyResponseMessage> {
        throw new Error('Method not implemented.');
    }

    public redirect(_data: RedirectRequestMessage, _metadata?: Metadata): Observable<RedirectResponseMessage> {
        throw new Error('Method not implemented.');
    }

    public report(_data: LinkRequestMessage, _metadata?: Metadata): Observable<LinkMessage> {
        throw new Error('Method not implemented.');
    }
}
