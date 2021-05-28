import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from } from 'rxjs';
import { User, UserSchemaProvide } from '../schemas/user';
import { ReportEventPayload } from '../../types';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(UserSchemaProvide) private userModel: Model<User>) {}

    public createUser(user: ReportEventPayload<User>): Observable<User> {
        const newUser = this.userModel.create(user as User);
        return from(newUser);
    }
}
