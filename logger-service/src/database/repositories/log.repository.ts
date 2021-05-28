import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from } from 'rxjs';
import { LogSchemaProvider, Log } from '../schemas/log.schema';

// Interfaces

@Injectable()
export class LogRepository {
    constructor(@InjectModel(LogSchemaProvider) private readonly logModel: Model<Log>) {}

    public create(data: Partial<Log>): Observable<Log> {
        return from(this.logModel.create(data as Log));
    }
}
