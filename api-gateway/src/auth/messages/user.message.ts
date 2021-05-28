export interface UserMessage {
    name: string;
    email: string;
    role: string;
    password: string;
    claims?: Array<string>;
    _id?: string;
}
