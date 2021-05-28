import { LocationMessage } from './location.message';

export interface Client {
    _id?: string;
    name: string;
    location: LocationMessage;
    secret?: string;
    user_id: string;
}
