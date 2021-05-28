import { Controller } from '@nestjs/common';
import shortId from 'shortid';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { Types } from 'mongoose';
import { ShortifyRepository } from './database/shortify.repository';
import { AppConfigService } from './config/app-config.service';
import { ShortifyRequestMessage } from './messages/shortify-request.message';
import { ShortifyResponseMessage } from './messages/shortify-response.message';
import { RedirectRequestMessage } from './messages/redirect-request.message';
import { LoggerOperations } from './logger/utils/logger-operations';
import { ReportMessageBrokerService } from './report/services/report-message-broker.service';
import { LoggerProvider } from './logger/logger.provider';
import { AppService } from './app.service';
import { RedirectResponseMessage } from './messages/redirect-response.message';
import { filterUndefinedAndThrowError } from './shared/operators/errors.operators';

/**
 * Define the proto service name to reflect controllers methods
 */
const ProtoService = 'ShortifyService';

@Controller()
export class AppController {
    private readonly logger: LoggerInstance<AppController>;

    constructor(
        private readonly shortifyRepository: ShortifyRepository,
        private readonly appConfigService: AppConfigService,
        private readonly reportService: ReportMessageBrokerService,
        private readonly appService: AppService,
        private readonly loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<AppController>(AppController);
    }

    @GrpcMethod(ProtoService)
    public shortify(data: ShortifyRequestMessage, metadata: Metadata): Observable<ShortifyResponseMessage> {
        const tag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.SHORTIFY_OPERATION, tag, `'Url': ${data.original_url}`);

        const tac: string = shortId.generate();
        const link = { tac, ...data, user_id: Types.ObjectId(data.user_id) };

        this.logger.info(
            LoggerOperations.GENERATE_TRACK_ID,
            tag,
            `'Tack_id': ${link.tac} - 'Url': ${link.original_url}`,
        );

        this.logger.info(LoggerOperations.DATABASE_CREATE_ATTEMPT, tag);

        return this.shortifyRepository.createLink(link).pipe(
            tap((result) =>
                this.logger.info(LoggerOperations.DATABASE_CREATE_SUCCESSFUL, tag, `'Id': ${result._id as string}`),
            ),
            tap((result) => this.reportService.sendLink({ ...result.toJSON(), tag })),
            map((result) => ({ url: this.appConfigService.serverUrl + result.tac })),
        );
    }

    @GrpcMethod(ProtoService)
    public redirect(data: RedirectRequestMessage, metadata: Metadata): Observable<RedirectResponseMessage> {
        const tag = this.loggerProvider.extractLoggerTag(metadata);
        this.logger.info(LoggerOperations.REDIRECT_OPERATION, tag, `'TAC': ${data.tac}`);

        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, tag);

        return this.shortifyRepository.findOne(data.tac).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, tag)),
            filterUndefinedAndThrowError('Link not found!', () =>
                this.logger.error(LoggerOperations.LINK_NOT_FOUND, tag),
            ),
        );
    }
}
