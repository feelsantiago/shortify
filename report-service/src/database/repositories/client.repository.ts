import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from } from 'rxjs';
import { Client, ClientSchemaProvide } from '../schemas/client';

@Injectable()
export class ClientRepository {
    constructor(@InjectModel(ClientSchemaProvide) private clientModel: Model<Client>) {}

    public createUser(client: Client): Observable<Client> {
        return from(this.clientModel.create(client));
    }
}
