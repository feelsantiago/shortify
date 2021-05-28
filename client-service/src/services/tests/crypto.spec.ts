import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '../crypto.service';
import { AppConfigModule } from '../../config/app-config.module';

describe('CryptoService', () => {
    let cryptoService: CryptoService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppConfigModule],
            controllers: [],
            providers: [CryptoService],
        }).compile();

        cryptoService = app.get<CryptoService>(CryptoService);
    });

    describe('encrypt', () => {
        it('should encrypt a string', () => {
            expect(cryptoService.encrypt('string to encrypt')).not.toBe('string to encrypt');
        });
    });

    describe('encrypt', () => {
        it('should encrypt a object', () => {
            const encrypted = cryptoService.encrypt({ message: 'message' });

            expect(encrypted).not.toEqual({ message: 'message' });
            expect(typeof encrypted).toBe('string');
        });
    });

    describe('decrypt', () => {
        it('should decrypt a string', () => {
            const message = 'string to encrypt';
            const encrypted = cryptoService.encrypt(message);

            const decrypt = cryptoService.decrypt(encrypted);
            expect(decrypt).toBe(message);
        });
    });

    describe('decrypt', () => {
        it('should decrypt a object', () => {
            const obj = { message: 'message' };
            const encrypted = cryptoService.encrypt(obj);

            const decrypt = cryptoService.decrypt(encrypted);
            expect(decrypt).toEqual(obj);
        });
    });
});
