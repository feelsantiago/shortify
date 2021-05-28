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
import { ErrorService } from '../shared/services/error.service';
import { LoggerProvider } from '../logger/logger.provider';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    private readonly logger: LoggerInstance<ExceptionInterceptor>;

    constructor(private loggerProvider: LoggerProvider, private readonly errorService: ErrorService) {
        this.logger = loggerProvider.createLoggerInstance<ExceptionInterceptor>(ExceptionInterceptor);
    }

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            catchError((err) => {
                if (this.errorService.isGenericErrors(err)) {
                    if (err.details === 'Internal server error') {
                        return throwError(new InternalServerErrorException());
                    }

                    const http = context.switchToHttp();
                    const request: Request = http.getRequest();
                    const [message, stack] = this.errorService.getMessage(err);

                    this.logger.error(message, request.loggerData.tag, stack);

                    return throwError(new BadRequestException(err.details));
                }

                return throwError(err);
            }),
        );
    }
}
