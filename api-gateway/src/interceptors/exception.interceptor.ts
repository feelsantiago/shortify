import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { Request } from 'express';
import { LoggerProvider } from '../logger/logger.provider';
import { ErrorService } from '../shared/services/error.service';
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    private readonly logger: LoggerInstance<ExceptionInterceptor>;

    constructor(private readonly loggerProvider: LoggerProvider, private readonly errorService: ErrorService) {
        this.logger = loggerProvider.createLoggerInstance<ExceptionInterceptor>(ExceptionInterceptor);
    }

    public intercept(context: ExecutionContext, next: CallHandler<Error>): Observable<Error> {
        return next.handle().pipe(
            catchError((err: unknown) => {
                const http = context.switchToHttp();
                const request: Request = http.getRequest();
                const [message, stack] = this.errorService.getMessage(err);

                this.logger.error(message, request.loggerData.tag, stack);

                if (this.errorService.isGenericErrors(err) && err.details) {
                    if (err.details === 'Internal server error') {
                        return throwError(new InternalServerErrorException());
                    }

                    return throwError(new BadRequestException(err.details));
                }

                return throwError(err);
            }),
        );
    }
}
