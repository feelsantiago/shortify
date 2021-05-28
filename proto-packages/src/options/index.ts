import { join } from 'path';
import { environment } from '../config';
import { ProtoPackage } from './types';

const env = environment();
const isRunningOnDocker = process.env.DOCKER;

const createOption = (name: string, url: string, port: number, path: string): ProtoPackage => ({
    name,
    path,
    port,
    url: `${url}:${port}`,
});

const resolvePackagePath = (name: string): string =>
    join(__dirname, '..', 'packages', `${name}-service`, `${name}.proto`);

const auth = {
    port: 5000,
    prod: 'url://prod',
    dev: isRunningOnDocker ? '0.0.0.0' : 'localhost',
};

const client = {
    port: 5001,
    prod: 'url://prod',
    dev: isRunningOnDocker ? '0.0.0.0' : 'localhost',
};

const shortify = {
    port: 5002,
    prod: 'url://prod',
    dev: isRunningOnDocker ? '0.0.0.0' : 'localhost',
};

export const AuthPackage = createOption('auth', auth[env], auth.port, resolvePackagePath('auth'));
export const ClientPackage = createOption('client', client[env], auth.port, resolvePackagePath('client'));
export const ShortifyPackage = createOption('shortify', shortify[env], auth.port, resolvePackagePath('shortify'));
