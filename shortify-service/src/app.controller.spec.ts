// TODO: fix findOne and findByIdAndUpdate test

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import * as shortid from 'shortid';
import mongoose, { Model } from 'mongoose';
import { Metadata } from 'grpc';
import { of } from 'rxjs';
import { AppController } from './app.controller';
import { ShortifyRequestMessage } from './messages/shortify-request.message';
import { DatabaseModule } from './database/database.module';
import { Link } from './database/schemas/link';
import { AppConfigModule } from './config/app-config.module';
import { ShortifyRepository as RepositoryService } from './database/shortify.repository';
import { AppConfigService } from './config/app-config.service';
import { LoggerModule } from './logger/logger.module';
import { ReportModule } from './report/report.module';
import { ReportMessageBrokerService } from './report/services/report-message-broker.service';
import { LoggerProvider } from './logger/logger.provider';

describe('AppController', () => {
    let appController: AppController;
    let linksModel: Model<Link>;
    let loggerProvider: LoggerProvider;
    let reportService: ReportMessageBrokerService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppConfigModule, DatabaseModule, LoggerModule, ReportModule],
            controllers: [AppController],
            providers: [],
        }).compile();

        linksModel = app.get<RepositoryService>(RepositoryService).links;
        loggerProvider = app.get<LoggerProvider>(LoggerProvider);
        reportService = app.get<ReportMessageBrokerService>(ReportMessageBrokerService);

        appController = new AppController(
            app.get<RepositoryService>(RepositoryService),
            app.get<AppConfigService>(AppConfigService),
            loggerProvider,
            reportService,
        );
    });

    afterEach(async (done) => {
        await mongoose.connection.close();
        done();
    });

    describe('shortify', () => {
        it('Should return "New shortify url with TAC-SHORTID"', () => {
            const data: ShortifyRequestMessage = {
                original_url: 'www.test.com',
                channel: 'test',
                asset: 'test asset',
                user_id: 'test',
            };
            jest.spyOn(linksModel, 'create').mockImplementation((link: Link) => Promise.resolve(link));
            jest.spyOn(reportService, 'sendLink').mockImplementation(() => of('').subscribe());

            const metadata = new Metadata();
            metadata.add('error_id', 'test_error_id');

            const result = appController.shortify(data, metadata);

            result.subscribe((observer) => {
                const tac = observer.url.split('/').reverse()[0];
                expect(observer.url !== data.original_url);
                expect(shortid.isValid(tac));
            });
        });
    });

    describe('redirect', () => {
        it('Should return "Original Url"', () => {
            const link = {
                tac: 'PPBqWA9',
                original_url: 'www.test.com',
                clicks: 0,
                activities: [],
            };

            const data: any = {
                tac: link.tac,
                activity: {
                    _id: undefined,
                    accept: 'mock',
                    accept_language: 'mock',
                    host: 'mock',
                    ip: 'mock',
                    referer: 'mock',
                    user_agent: 'mock',
                    activity_track_id: '123',
                    description: 'test activity',
                    created_at: new Date(),
                },
            };

            jest.spyOn(linksModel, 'findOne').mockImplementation(() => {
                return link as any;
            });
            jest.spyOn(linksModel, 'findByIdAndUpdate').mockImplementation((id, res: any) => {
                link.clicks = res.clicks;
                link.activities.push(res.$push.activities);

                res.clicks = link.clicks;
                res.activities = link.activities;

                return res;
            });
            jest.spyOn(reportService, 'sendActivity').mockImplementation(() => of('').subscribe());

            const metadata = new Metadata();
            metadata.add('error_id', 'test_error_id');

            const result = appController.redirect(data, metadata);

            result.subscribe((nLink) => {
                expect(nLink.original_url === link.original_url);
                expect(link.clicks > 0);
                expect(link.activities.length > 1);
            });
        });
    });
});
