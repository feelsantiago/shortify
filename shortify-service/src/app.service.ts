import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { RedirectRequestMessage } from './messages/redirect-request.message';
import { LoggerProvider } from './logger/logger.provider';
import { LoggerOperations } from './logger/utils/logger-operations';
import { Link } from './database/schemas/link';
import { RedirectResponseMessage } from './messages/redirect-response.message';
import { ShortifyRepository } from './database/shortify.repository';
import { ReportMessageBrokerService } from './report/services/report-message-broker.service';

@Injectable()
export class AppService {
    private readonly logger: LoggerInstance<AppService>;

    constructor(
        private readonly shortifyRepository: ShortifyRepository,
        private readonly reportService: ReportMessageBrokerService,
        loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<LoggerProvider>(LoggerProvider);
    }

    public redirectProcess(link: Link, data: RedirectRequestMessage, tag: string): Observable<RedirectResponseMessage> {
        this.logger.info(
            LoggerOperations.DATABASE_UPDATE_ATTEMPT,
            tag,
            `'Activity_track_id': ${data.activity.activity_track_id}`,
        );

        return this.shortifyRepository.addActivityOnLink(link, data.activity).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_UPDATE_SUCCESSFUL, tag)),
            tap((result) =>
                this.reportService.sendActivity({
                    tag,
                    clicks: result.clicks,
                    tac: data.tac,
                    ...result.activities.pop().toJSON(),
                }),
            ),
            map((result) => ({ original_url: result.original_url })),
        );
    }
}
