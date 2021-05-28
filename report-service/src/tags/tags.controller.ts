import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoggerInstance } from 'feel-logger';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerData } from '../interfaces/logger-data.interface';
import { LoggerInfo } from '../decorators/logger-info.decorator';
import { UserMessage } from '../auth/messages/user.message';
import { LoggerProvider } from '../logger/logger.provider';
import { TagUsersRepository } from '../database/repositories/tag-users.repository';
import { UserInfo } from '../auth/decorators/user.decorator';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
    private logger: LoggerInstance<TagsController>;

    constructor(private readonly tagUsersRepository: TagUsersRepository, private loggerProvider: LoggerProvider) {
        this.logger = this.loggerProvider.createLoggerInstance<TagsController>(TagsController);
    }

    @Get('autocomplete')
    public getAutocompleteTagsByUser(
        @UserInfo() user: UserMessage,
        @LoggerInfo() loggerData: LoggerData,
    ): Observable<string[]> {
        this.logger.info(LoggerOperations.TAG_USER_RECOVERY_OPERATION_START, loggerData.tag);
        this.logger.info(LoggerOperations.DATABASE_READ_ATTEMPT, loggerData.tag);
        return this.tagUsersRepository.getTagsByUser(user._id.toString()).pipe(
            map((result) => result.map((tag) => tag.key)),
            tap(() => {
                this.logger.info(LoggerOperations.DATABASE_READ_SUCCESSFUL, loggerData.tag);
            }),
        );
    }
}
