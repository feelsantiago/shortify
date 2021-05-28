import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LoggerInstance } from 'feel-logger';
import { tap } from 'rxjs/operators';
import { LoggerProvider } from '../logger/logger.provider';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { ShortifyRepository } from '../database/repositories/shortify.repository';
import { Link } from '../database/schemas/link';
import { ActivityDetails } from '../database/schemas/activity-details';
import { ReportEventPayload, ActivityDetailsLink } from '../types';
import { ShortifyService } from './shortify.service';

@Controller()
export class ShortifyController {
    private readonly logger: LoggerInstance<ShortifyController>;

    constructor(
        private readonly shortifyRepository: ShortifyRepository,
        loggerProvider: LoggerProvider,
        private readonly shortifyService: ShortifyService,
    ) {
        this.logger = loggerProvider.createLoggerInstance<ShortifyController>(ShortifyController);
    }

    @EventPattern('create_link')
    public create(data: ReportEventPayload<Link>): void {
        this.logger.info(LoggerOperations.SHORTIFY_REPORT_OPERATION_START, data.tag, `'Id': ${data._id}`);
        this.logger.info(LoggerOperations.DATABASE_CREATE_ATTEMPT, data.tag);

        this.shortifyRepository
            .createLink(data)
            .pipe(
                tap(() => {
                    this.logger.info(LoggerOperations.DATABASE_CREATE_SUCCESSFUL, data.tag);
                    this.logger.info(LoggerOperations.SHORTIFY_REPORT_OPERATION_SUCCESSFUL, data.tag);
                }),
                this.shortifyService.setUserToTags(data.tag),
            )
            .subscribe();
    }

    @EventPattern('add_activity')
    public activity(data: ReportEventPayload<ActivityDetailsLink>): void {
        this.logger.info(
            LoggerOperations.ACTIVITY_REPORT_OPERATION_START,
            data.tag,
            `'Id': ${data._id}`,
            `'Tac': ${data.tac}`,
        );

        this.logger.info(LoggerOperations.DATABASE_UPDATE_ATTEMPT, data.tag);

        this.shortifyRepository
            .findByIdAndUpdate(data.tac, {
                clicks: data.clicks,
                activities: data as ActivityDetails,
            })
            .subscribe(() => {
                this.logger.info(LoggerOperations.DATABASE_UPDATE_SUCCESSFUL, data.tag);
                this.logger.info(LoggerOperations.ACTIVITY_REPORT_OPERATION_SUCCESSFUL, data.tag);
            });
    }
}
