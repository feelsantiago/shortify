import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { ErrorService } from '../shared/services/error.service';
import { LoggerProvider } from '../logger/logger.provider';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    private readonly logger: LoggerInstance<ExceptionInterceptor>;

    constructor(private readonly loggerProvider: LoggerProvider, private readonly errorService: ErrorService) {
        this.logger = loggerProvider.createLoggerInstance<ExceptionInterceptor>(ExceptionInterceptor);
    }

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            catchError((err) => {
                const tag = this.loggerProvider.extractLoggerTag(context.getArgs()[1]);
                const [message, stack] = this.errorService.getMessage(err);

                this.logger.error(message, tag, stack);
                return throwError(err);
            }),
        );
    }
}
