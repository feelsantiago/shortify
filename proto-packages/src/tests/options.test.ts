import { access, readFile } from 'fs';
import { promisify } from 'util';
import { AuthPackage, ClientPackage, ShortifyPackage } from '../options';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);

test('Account has properties [name] [path] [url] [port]', () => {
    const { name, path, url, port } = AuthPackage;

    expect(name).not.toBeUndefined();
    expect(name).not.toBeNull();
    expect(name).not.toEqual('');

    expect(path).not.toBeUndefined();
    expect(path).not.toBeNull();
    expect(path).not.toEqual('');

    expect(url).not.toBeUndefined();
    expect(url).not.toBeNull();
    expect(url).not.toEqual('');

    expect(port).not.toBeUndefined();
    expect(port).not.toBeNull();
    expect(port).not.toEqual('');
});

test('Client has properties [name] [path] [url] [port]', () => {
    const { name, path, url, port } = ClientPackage;

    expect(name).not.toBeUndefined();
    expect(name).not.toBeNull();
    expect(name).not.toEqual('');

    expect(path).not.toBeUndefined();
    expect(path).not.toBeNull();
    expect(path).not.toEqual('');

    expect(url).not.toBeUndefined();
    expect(url).not.toBeNull();
    expect(url).not.toEqual('');

    expect(port).not.toBeUndefined();
    expect(port).not.toBeNull();
    expect(port).not.toEqual('');
});

test('Shortify has properties [name] [path] [url] [port]', () => {
    const { name, path, url, port } = ShortifyPackage;

    expect(name).not.toBeUndefined();
    expect(name).not.toBeNull();
    expect(name).not.toEqual('');

    expect(path).not.toBeUndefined();
    expect(path).not.toBeNull();
    expect(path).not.toEqual('');

    expect(url).not.toBeUndefined();
    expect(url).not.toBeNull();
    expect(url).not.toEqual('');

    expect(port).not.toBeUndefined();
    expect(port).not.toBeNull();
    expect(port).not.toEqual('');
});

test('Account package path exist', () => {
    const { path } = AuthPackage;
    return expect(accessAsync(path)).resolves.toBeUndefined();
});

test('Account package schema match syntax [proto3] and package match property [name]', async () => {
    const { path, name } = AuthPackage;

    try {
        const file = await readFileAsync(path, 'utf-8');

        const syntax = file.includes('proto3');
        const packageName = file.includes(`package ${name}`);

        expect(syntax).toBeTruthy();
        expect(packageName).toBeTruthy();
    } catch (error) {
        expect(error).toBeUndefined();
    }
});

test('Client package path exist', () => {
    const { path } = ClientPackage;
    return expect(accessAsync(path)).resolves.toBeUndefined();
});

test('Client package schema match syntax [proto3] and package match property [name]', async () => {
    const { path, name } = ClientPackage;

    try {
        const file = await readFileAsync(path, 'utf-8');

        const syntax = file.includes('proto3');
        const packageName = file.includes(`package ${name}`);

        expect(syntax).toBeTruthy();
        expect(packageName).toBeTruthy();
    } catch (error) {
        expect(error).toBeUndefined();
    }
});

test('Shortify package path exist', () => {
    const { path } = ShortifyPackage;
    return expect(accessAsync(path)).resolves.toBeUndefined();
});

test('Shortify package schema match syntax [proto3] and package match property [name]', async () => {
    const { path, name } = ShortifyPackage;

    try {
        const file = await readFileAsync(path, 'utf-8');

        const syntax = file.includes('proto3');
        const packageName = file.includes(`package ${name}`);

        expect(syntax).toBeTruthy();
        expect(packageName).toBeTruthy();
    } catch (error) {
        expect(error).toBeUndefined();
    }
});
