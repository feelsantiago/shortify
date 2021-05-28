import { Observable, throwError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

export const filterUndefinedAndThrowError = (
    errorMessage?: string,
    loggerErrorCallback?: () => void,
): (<T>(source: Observable<T>) => Observable<T>) => {
    const message = errorMessage || 'Undefined Value';

    return <T>(source: Observable<T>): Observable<T> =>
        source.pipe(
            switchMap((value) => {
                if (!value || value === undefined || value === null) {
                    if (loggerErrorCallback) loggerErrorCallback();
                    return throwError(new RpcException(message));
                }

                return of(value);
            }),
        );
};
