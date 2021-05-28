export const environment = (): 'prod' | 'dev' => {
    const env = process.env.NODE_ENV;

    if (!env) return 'dev';

    return env === 'dev' || env === 'development' ? 'dev' : 'prod';
};
