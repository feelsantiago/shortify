import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class CryptoService {
    private readonly iv: Buffer;

    constructor(private readonly appConfigService: AppConfigService) {
        this.iv = Buffer.from(this.appConfigService.cryptoIV, 'base64');
    }

    public encrypt(data: unknown): string {
        const cipher = crypto.createCipheriv(
            this.appConfigService.cryptoAlgorithm,
            this.appConfigService.cryptoSecret,
            this.iv,
        );
        return cipher.update(this.getDataAsString(data), 'utf8', 'hex') + cipher.final('hex');
    }

    public decrypt(hash: string): string {
        const decipher = crypto.createDecipheriv(
            this.appConfigService.cryptoAlgorithm,
            this.appConfigService.cryptoSecret,
            this.iv,
        );

        const result = decipher.update(hash, 'hex', 'utf8') + decipher.final('utf8');
        return this.parseResult(result);
    }

    private getDataAsString(data: unknown): string {
        if (typeof data === 'string') return data;

        return JSON.stringify(data);
    }

    /**
     * Get the string or object who as decrypted
     * @param result decrypted string
     */
    private parseResult(value: string): string {
        let result: string = value;
        try {
            // try to transform the string to object, if throw error is because is a regular string
            result = JSON.parse(value) as string;

            return result;
        } catch {
            return result;
        }
    }
}
