import { Controller, Get, Req, Param, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerInstance } from 'feel-logger';
import { ActivityDetailMessage } from './shortify/messages/activity-detail.message';
import { ShortifyService } from './shortify/services/shortify.service';
import { LoggerInfo } from './decorators/logger-info.decorator';
import { LoggerData } from './interfaces/logger-data.interface';
import { CookieService } from './shared/services/cookie.service';
import { ErrorService } from './shared/services/error.service';
import { LoggerOperations } from './logger/utils/logger-operations';
import { LoggerProvider } from './logger/logger.provider';

@Controller()
export class AppController {
    private readonly logger: LoggerInstance<AppController>;

    constructor(
        private readonly shortifyService: ShortifyService,
        private readonly cookieService: CookieService,
        private readonly errorService: ErrorService,
        loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<AppController>(AppController);
    }

    @Get(':tac')
    public redirect(
        @Param('tac') tac: string,
        @Req() request: Request,
        @Res() response: Response,
        @LoggerInfo() loggerData: LoggerData,
    ): void {
        const cookie: string = this.cookieService.verifyCookie(request.cookies);

        const { tag } = loggerData;

        const activity: ActivityDetailMessage = {
            accept: request.headers.accept,
            accept_language: request.headers['accept-language'],
            host: request.headers.host,
            referer: request.headers.referer,
            user_agent: request.headers['user-agent'],
            ip: request.ip,
            description: 'redirect/direct link access',
            activity_track_id: cookie || this.cookieService.setCookie(response),
        };

        this.logger.info(LoggerOperations.CALL_SHORTIFY_SERVICE_ATTEMPT, tag);
        this.shortifyService.redirect({ tac, activity }, loggerData.metadata).subscribe(
            (result) => {
                this.logger.info(LoggerOperations.CALL_SHORTIFY_SERVICE_SUCCESSFUL, tag);
                return response.redirect(result.original_url);
            },
            (error: unknown) => {
                const [message, stack] = this.errorService.getMessage(error);
                this.logger.error(message, tag, stack);
                response.send(message);
            },
        );
    }
}
