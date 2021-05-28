import { LocationMessage } from './location.message';

export class ClientMessage {
    public _id: string;

    public name: string;

    public location: LocationMessage;

    public secret: string;

    public user_id: string;
}
