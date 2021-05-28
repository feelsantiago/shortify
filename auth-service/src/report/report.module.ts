import { Module } from '@nestjs/common';
import { reportProviders } from './report.provider';
import { AppConfigModule } from '../config/app-config.module';
import { ReportMessageBrokerService } from './services/report-message-broker.service';

@Module({
    imports: [AppConfigModule],
    providers: [...reportProviders, ReportMessageBrokerService],
    exports: [...reportProviders, ReportMessageBrokerService],
})
export class ReportModule {}
