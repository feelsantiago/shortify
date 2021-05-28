import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { LoggerInstance } from 'feel-logger';
import { CryptoService } from './crypto.service';
import { LoggerProvider } from '../logger/logger.provider';
import { ErrorService } from './error.service';

export interface ISecretValidateResult {
    result: boolean;
    _id?: string;
}

@Injectable()
export class SecretService {
    private readonly logger: LoggerInstance<SecretService>;

    constructor(
        private readonly cryptoService: CryptoService,
        loggerProvider: LoggerProvider,
        private readonly errorService: ErrorService,
    ) {
        this.logger = loggerProvider.createLoggerInstance<SecretService>(SecretService);
    }

    public create(_id: Types.ObjectId): string {
        const today = new Date();
        return this.cryptoService.encrypt(`${_id.toHexString()}&${today.toISOString()}`);
    }

    public validate(hash: string, tag: string): ISecretValidateResult {
        try {
            const decrypted = this.cryptoService.decrypt(hash);
            const elements = decrypted.split('&');

            if (!(elements.length === 2)) return { result: false };

            const _id = new Types.ObjectId(elements[0]);
            return { result: true, _id: _id.toHexString() };
        } catch (error) {
            const [message, stack] = this.errorService.getMessage(error);
            this.logger.error(message, tag, stack);
        }

        return { result: false };
    }
}
