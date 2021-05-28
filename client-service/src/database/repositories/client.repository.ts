import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';

// classes
import { ClientMessage } from '../../messages/client.message';
import { Client, ClientSchemaProvider } from '../schemas/client';

@Injectable()
export class ClientRepository {
    constructor(@InjectModel(ClientSchemaProvider) private readonly clientModel: Model<Client>) {}

    public create(client: ClientMessage): Observable<Client> {
        return from(this.clientModel.create(client));
    }

    public getClientById(id: string): Observable<Client> {
        return from(this.clientModel.findById(id));
    }
}
