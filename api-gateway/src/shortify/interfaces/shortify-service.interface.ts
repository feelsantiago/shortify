import { Observable } from 'rxjs';

import { Metadata } from 'grpc';
import { ShortifyRequestMessage } from '../messages/shortify-request.message';
import { ShortifyResponseMessage } from '../messages/shortify-response.message';
import { RedirectRequestMessage } from '../messages/redirect-request.message';
import { RedirectResponseMessage } from '../messages/redirect-response.message';
import { LinkRequestMessage } from '../messages/link-request.message';
import { LinkMessage } from '../messages/link.message';

export interface IShortifyService {
    shortify(data: ShortifyRequestMessage, metadata?: Metadata): Observable<ShortifyResponseMessage>;
    redirect(data: RedirectRequestMessage, metadata?: Metadata): Observable<RedirectResponseMessage>;
    report(data: LinkRequestMessage, metadata?: Metadata): Observable<LinkMessage>;
}
