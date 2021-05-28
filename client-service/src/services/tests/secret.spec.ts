import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { LoggerProvider } from '../../logger/logger.provider';
import { AppConfigModule } from '../../config/app-config.module';
import { SecretService } from '../secret.service';
import { CryptoService } from '../crypto.service';
import { LoggerModule } from '../../logger/logger.module';

describe('CryptoService', () => {
    let secretService: SecretService;
    let cryptoService: CryptoService;
    let loggerProvider: LoggerProvider;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppConfigModule, LoggerModule],
            controllers: [],
            providers: [CryptoService],
        }).compile();

        cryptoService = app.get<CryptoService>(CryptoService);
        loggerProvider = app.get<LoggerProvider>(LoggerProvider);

        secretService = new SecretService(cryptoService, loggerProvider);
    });

    describe('create', () => {
        it('should create a secret', () => {
            const id = new Types.ObjectId();

            jest.spyOn(cryptoService, 'encrypt').mockImplementation(() => 'hash string');
            const hash = secretService.create(id);

            expect(hash).not.toBe(id);
        });
    });

    describe('validate', () => {
        it('should validate true', () => {
            const id = new Types.ObjectId();

            jest.spyOn(cryptoService, 'decrypt').mockImplementation(
                () => `${id.toHexString()}&${new Date().toISOString()}`,
            );
            const result = secretService.validate('hash', 'error_id');
            expect(result.result).toBe(true);
            expect(result._id).toMatch(/^(?=[\da-f]{24}$)(\d+[a-f]|[a-f]+\d)/i);
        });
    });

    describe('validate', () => {
        it('should validate false for hash', () => {
            jest.spyOn(cryptoService, 'decrypt').mockImplementation(() => 'error hash');
            const result = secretService.validate('hash to throw error', 'error_id');
            expect(result.result).toBe(false);
        });
    });

    describe('validate', () => {
        it('should validate false for id', () => {
            jest.spyOn(cryptoService, 'decrypt').mockImplementation(() => `asd&${new Date().toISOString()}`);
            const result = secretService.validate('hash to throw error', 'error_id');
            expect(result.result).toBe(false);
        });
    });

    describe('validate', () => {
        it('should validate false for date', () => {
            jest.spyOn(cryptoService, 'decrypt').mockImplementation(() => 'error hash');
            const result = secretService.validate('hash to throw error', `${new Types.ObjectId().toHexString()}&date`);
            expect(result.result).toBe(false);
        });
    });
});
