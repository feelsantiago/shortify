import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { CookieService } from './services/cookie.service';
import { ErrorService } from './services/error.service';

@Module({
    imports: [AppConfigModule],
    controllers: [],
    providers: [CookieService, ErrorService],
    exports: [CookieService, ErrorService],
})
export class SharedModule {}
