import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { join } from 'path';

const env = process.env.NODE_ENV;
const config = env ? `${env}.env` : 'development.env';
const configPath = join(process.cwd(), '/environments', config);

export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: configPath,
};
