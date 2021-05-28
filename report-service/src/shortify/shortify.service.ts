import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { TagUsers } from '../database/schemas/tag-users';
import { Link } from '../database/schemas/link';
import { TagUsersRepository } from '../database/repositories/tag-users.repository';
import { LoggerProvider } from '../logger/logger.provider';

@Injectable()
export class ShortifyService {
    private logger: LoggerInstance<ShortifyService>;

    constructor(private readonly tagUsersRepository: TagUsersRepository, loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance<ShortifyService>(ShortifyService);
    }

    public setUserToTags(loggerTag: string): (source: Observable<Link>) => Observable<TagUsers[]> {
        return (source: Observable<Link>): Observable<TagUsers[]> =>
            source.pipe(
                tap(() => this.logger.info(LoggerOperations.TAG_USER_OPERATION_START, loggerTag)),
                switchMap((result) => {
                    const onlyKey = result.tags.map((tag) => tag.key);
                    return from(onlyKey).pipe(map((key) => ({ key, userId: result.user_id })));
                }),
                concatMap(({ key, userId }) => this.tagUsersRepository.savingTagToUser(key, userId.toString())),
                toArray(),
                tap(() => this.logger.info(LoggerOperations.TAG_USER_OPERATION_SUCCESSFUL, loggerTag)),
            );
    }
}
