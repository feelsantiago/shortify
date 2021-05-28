import { Response, Request } from 'express';

// TODO: Refactor this code to new extract jwt method

/**
 * Extract the 'Bearer' token from 'Authorization' header parameter
 * @param req
 * @param res
 * @param next
 */
export async function token(req: Request, res: Response, next: () => Promise<void>): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) {
        // no authorization header
        return next();
    }
    const splited = authorization.split(' ');
    if (splited.length < 2) {
        // no authorization schema
        return next();
    }

    if (splited[0] !== 'Bearer') {
        // no 'Bearer' authorization
        return next();
    }

    const generatedToken = splited.reverse()[0];
    if (generatedToken === '') return next();

    req.token = generatedToken;
    return next();
}
