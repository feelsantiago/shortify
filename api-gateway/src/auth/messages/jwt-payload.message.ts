export interface JwtPayloadMessage {
    _id: string;
    email: string;
    role: string;
    iat?: string;
}
