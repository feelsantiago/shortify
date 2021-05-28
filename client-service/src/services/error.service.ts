import { Injectable } from '@nestjs/common';

interface IGenericErrors {
    details?: string;
    code?: string;
    message?: string;
    stack?: string;
}

@Injectable()
export class ErrorService {
    public getMessage(error: unknown): [string, string] {
        let message: [string, string] = ['Unexpected Error', 'No stack'];

        if (this.isInstanceError(error)) message = [error.message, error.stack];
        else if (this.isGenericErrors(error)) message = [error.details, error.stack] || [error.message, error.stack];
        else if (typeof error === 'string') message = [error, 'No Stack'];

        return message;
    }

    public isGenericErrors(error: unknown): error is IGenericErrors {
        return (
            ((error as IGenericErrors).details !== undefined &&
                typeof (error as IGenericErrors).details === 'string') ||
            (error as IGenericErrors).code !== undefined ||
            ((error as IGenericErrors).stack !== undefined && typeof (error as IGenericErrors).stack === 'string')
        );
    }

    private isInstanceError(obj: unknown): obj is Error {
        return obj instanceof Error && obj.message !== undefined;
    }
}
