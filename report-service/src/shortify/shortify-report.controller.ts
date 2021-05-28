import { Controller, UseGuards, Get, Param, ForbiddenException, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { LoggerProvider } from '../logger/logger.provider';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserInfo } from '../auth/decorators/user.decorator';
import { LoggerData } from '../interfaces/logger-data.interface';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { ShortifyService } from './shortify.service';
import { Link } from '../database/schemas/link';
import { ShortifyRepository } from '../database/repositories/shortify.repository';
import { LoggerInfo } from '../decorators/logger-info.decorator';
import { UserMessage } from '../auth/messages/user.message';
import { ReportLinks, ReportLinksGroup, Groups, ReportLinksTag } from './interfaces/report-links.interface';

@UseGuards(JwtAuthGuard)
@Controller('shortify')
export class ShortifyReportController {
    private readonly logger: LoggerInstance<ShortifyReportController>;

    constructor(
        private readonly shortifyRepository: ShortifyRepository,
        private readonly shortifyService: ShortifyService,
        loggerProvider: LoggerProvider,
    ) {
        this.logger = loggerProvider.createLoggerInstance<ShortifyReportController>(ShortifyReportController);
    }

    @Get('report/links')
    public reportLinks(@UserInfo() user: UserMessage, @LoggerInfo() loggerData: LoggerData): Observable<ReportLinks> {
        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerData.tag);
        return this.shortifyRepository
            .getReportLinks(user._id)
            .pipe(tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, loggerData.tag)));
    }

    @Get('report/links/group')
    public reportLinksByGroup(
        @UserInfo() user: UserMessage,
        @LoggerInfo() loggerData: LoggerData,
        @Query('by') group: Groups,
    ): Observable<ReportLinksGroup[]> {
        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerData.tag);
        return this.shortifyRepository
            .getReportLinksByGroup(user._id, group)
            .pipe(tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, loggerData.tag)));
    }

    @Get('report/links/tag')
    public reportLinksByTag(
        @UserInfo() user: UserMessage,
        @LoggerInfo() loggerData: LoggerData,
        @Query('key') key: string | string[],
    ): Observable<ReportLinksTag[]> {
        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerData.tag);
        return this.shortifyRepository.getReportLinksByTag(user._id, [].concat(key));
    }

    @Get(':tac')
    public link(
        @Param('tac') tac: string,
        @UserInfo() user: UserMessage,
        @LoggerInfo() loggerData: LoggerData,
    ): Observable<Link> {
        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerData.tag);
        return this.shortifyRepository.findOne(tac, user._id).pipe(
            tap(() => this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, loggerData.tag)),
            tap((link) => {
                if (!link) {
                    this.logger.error(
                        LoggerOperations.FORBIDDEN_RESOURCE_FOR_USER,
                        loggerData.tag,
                        `'Tac: ${tac}'`,
                        `User access 'Id': ${user._id}`,
                    );

                    // Refactor Throw Observable Error
                    throw new ForbiddenException('Forbidden resource');
                }
            }),
        );
    }
}
