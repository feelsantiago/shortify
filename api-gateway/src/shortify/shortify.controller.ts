import { Controller, UseGuards, Post, Req, Body, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { LoggerProvider } from '../logger/logger.provider';
import { ShortifyService } from './services/shortify.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../auth/decorators/user.decorator';
import { ShortifyRequestDto } from './dtos/shortify-request.dto';
import { LoggerInfo } from '../decorators/logger-info.decorator';
import { LoggerData } from '../interfaces/logger-data.interface';
import { ActivityDto } from './dtos/activity.dto';
import { SecretGuard } from '../auth/guards/secret.guard';
import { ActivityDetailMessage } from './messages/activity-detail.message';
import { CookieService } from '../shared/services/cookie.service';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { UserMessage } from '../auth/messages/user.message';
import { ShortifyResponseMessage } from './messages/shortify-response.message';
import { ErrorService } from '../shared/services/error.service';

@Controller('shortify')
export class ShortifyController {
    private readonly logger: LoggerInstance<ShortifyController>;

    constructor(
        private readonly shortifyService: ShortifyService,
        private readonly cookieService: CookieService,
        private readonly errorService: ErrorService,
        private readonly loggerProvider: LoggerProvider,
    ) {
        this.logger = this.loggerProvider.createLoggerInstance<ShortifyController>(ShortifyController);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    public shortify(
        @Body() body: ShortifyRequestDto,
        @User() user: UserMessage,
        @LoggerInfo() loggerData: LoggerData,
    ): Observable<ShortifyResponseMessage> {
        const shortify = { user_id: user._id, ...body };

        const { tag, metadata } = loggerData;

        this.logger.info(LoggerOperations.CALL_SHORTIFY_SERVICE_ATTEMPT, tag);

        return this.shortifyService
            .shortify(shortify, metadata)
            .pipe(tap(() => this.logger.info(LoggerOperations.CALL_SHORTIFY_SERVICE_SUCCESSFUL, tag)));
    }

    @UseGuards(SecretGuard)
    @Post('activity')
    public activity(
        @Body() body: ActivityDto,
        @Req() request: Request,
        @Res() response: Response,
        @LoggerInfo() loggerData: LoggerData,
    ): void {
        const cookie: string = this.cookieService.verifyCookie(request.cookies);
        const { tag, metadata } = loggerData;

        const activity: ActivityDetailMessage = {
            accept: request.headers.accept,
            accept_language: request.headers['accept-language'],
            host: request.headers.host,
            referer: request.headers.referer,
            user_agent: request.headers['user-agent'],
            ip: request.ip,
            description: body.description ? body.description : 'push activity',
            activity_track_id: cookie || this.cookieService.setCookie(response),
        };

        this.logger.info(LoggerOperations.CALL_SHORTIFY_SERVICE_ATTEMPT, tag);
        this.shortifyService.redirect({ tac: body.tac, activity }, metadata).subscribe(
            () => {
                this.logger.info(LoggerOperations.CALL_SHORTIFY_SERVICE_SUCCESSFUL, tag);
                return response.json({ registered: true });
            },
            (error: unknown) => {
                const [message, stack] = this.errorService.getMessage(error);
                this.logger.error(message, tag, stack);
                response.send(message);
            },
        );
    }
}
