import { Injectable, Type } from '@nestjs/common';
import { Logger, LoggerInstance } from 'feel-logger';
import { AppConfigService } from './config/app-config.service';

@Injectable()
export class AppProvider {
    constructor(private readonly configService: AppConfigService) {
        Logger.init({
            file: this.configService.persistDataToFile,
            fileOptions: {
                filename: '%DATE%-Logger.log',
            },
            name: 'Logger',
        });
    }

    public createLoggerInstance<T>(context: Type<T>): LoggerInstance<T> {
        return Logger.createLoggerInstance(context);
    }
}
