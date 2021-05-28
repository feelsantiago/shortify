import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { REPORT_OPERATIONS } from '../operations/report.operation';
import { User } from '../../database/schemas/user.schema';
import { AuthEventPayload } from '../../types';

@Injectable()
export class ReportMessageBrokerService {
    constructor(
        @Inject(REPORT_OPERATIONS.SERVICE_NAME)
        private readonly client: ClientProxy,
    ) {}

    public sendUser(data: AuthEventPayload<User>): Subscription {
        return this.client.emit(REPORT_OPERATIONS.CREATE_USER, data).subscribe();
    }
}
