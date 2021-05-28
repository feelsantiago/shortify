import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { from, Observable } from 'rxjs';
import { UserMessage } from '../messages/user.message';
import { UserSchemaProvide, User } from './schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(UserSchemaProvide) private readonly userModel: Model<User>) {}

    public create(createUserDto: UserMessage): Observable<User> {
        return from(this.userModel.create(createUserDto as User));
    }

    public getUserByEmailWithPassword(email: string): Observable<User> {
        return from(this.userModel.findOne({ email }).select('+password'));
    }

    public getUserById(id: string): Observable<User> {
        return from(this.userModel.findById(id));
    }
}
