import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription } from 'rxjs';
import { REPORT_OPERATIONS } from '../operations/report.operation';
import { Client } from '../../database/schemas/client';
import { ClientEventPayload } from '../../types';

@Injectable()
export class ReportMessageBrokerService {
    constructor(@Inject(REPORT_OPERATIONS.SERVICE_NAME) private readonly client: ClientProxy) {}

    public sendClient(data: ClientEventPayload<Client>): Subscription {
        return this.client.emit(REPORT_OPERATIONS.CREATE_CLIENT, data).subscribe();
    }
}
