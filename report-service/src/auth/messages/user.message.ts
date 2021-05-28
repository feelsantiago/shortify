export interface UserMessage {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    claims?: string[];
}
