import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class CookieService {
    constructor(private readonly configService: AppConfigService) {}

    public verifyCookie(cookies: Record<string, string>): string | undefined {
        const cookie: string = cookies[this.configService.cookieName];

        return cookie;
    }

    public setCookie(response: Response): string {
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.slice(2, randomNumber.length);
        response.cookie(this.configService.cookieName, randomNumber, {
            maxAge: this.configService.cookieExpirationTime,
            httpOnly: true,
        });

        return randomNumber;
    }
}
