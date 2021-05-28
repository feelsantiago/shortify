import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { LoggerInstance } from 'feel-logger';
import { User } from '../database/schemas/user';
import { LoggerProvider } from '../logger/logger.provider';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { UserRepository } from '../database/repositories/user.repository';
import { ReportEventPayload } from '../types';

@Controller()
export class AuthController {
    private readonly logger: LoggerInstance<AuthController>;

    constructor(private readonly userRepository: UserRepository, loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance<AuthController>(AuthController);
    }

    @EventPattern('create_user')
    public create(data: ReportEventPayload<User>): void {
        this.logger.info(LoggerOperations.USER_REPORT_OPERATION_START, data.tag, `'Id': ${data._id}`);
        this.logger.info(LoggerOperations.DATABASE_CREATE_ATTEMPT, data.tag);

        this.userRepository.createUser(data).subscribe(() => {
            this.logger.info(LoggerOperations.DATABASE_CREATE_SUCCESSFUL, data.tag);
            this.logger.info(LoggerOperations.USER_REPORT_OPERATION_SUCCESSFUL, data.tag);
        });
    }
}
