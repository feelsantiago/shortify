import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerInstance } from 'feel-logger';
import { LoggerProvider } from '../logger/logger.provider';
import { LoggerData } from '../interfaces/logger-data.interface';
import { ClientService } from './services/client.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../auth/decorators/user.decorator';
import { LoggerInfo } from '../decorators/logger-info.decorator';
import { ClientDto } from './dtos/client.dto';
import { LoggerOperations } from '../logger/utils/logger-operations';
import { Client } from './messages/client.message';
import { UserMessage } from '../auth/messages/user.message';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('client')
export class ClientController {
    private readonly logger: LoggerInstance<ClientController>;

    constructor(private readonly clientService: ClientService, loggerProvider: LoggerProvider) {
        this.logger = loggerProvider.createLoggerInstance<ClientController>(ClientController);
    }

    @Post()
    public create(
        @Body() body: ClientDto,
        @User() user: UserMessage,
        @LoggerInfo() loggerData: LoggerData,
    ): Observable<Client> {
        const client: Client = { user_id: user._id, ...body };
        const { tag, metadata } = loggerData;

        this.logger.info(LoggerOperations.CALL_CLIENT_SERVICE_ATTEMPT, tag);

        return this.clientService
            .create(client, metadata)
            .pipe(tap(() => this.logger.info(LoggerOperations.CALL_CLIENT_SERVICE_SUCCESSFUL, tag)));
    }
}
