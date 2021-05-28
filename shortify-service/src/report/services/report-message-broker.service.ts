import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { ActivityDetailsLink, ShortEventPayload } from '../../types';
import { Link } from '../../database/schemas/link';
import { REPORT_OPERATIONS } from '../operations/report.operation';

@Injectable()
export class ReportMessageBrokerService {
    constructor(@Inject(REPORT_OPERATIONS.SERVICE_NAME) private readonly client: ClientProxy) {}

    public sendLink(data: ShortEventPayload<Link>): Subscription {
        return this.client.emit(REPORT_OPERATIONS.CREATE_LINK, data).subscribe();
    }

    public sendActivity(data: ShortEventPayload<ActivityDetailsLink>): Subscription {
        return this.client.emit(REPORT_OPERATIONS.ADD_ACTIVITY, data).subscribe();
    }
}
