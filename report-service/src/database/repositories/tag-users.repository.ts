import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { TagUsers, TagUsersSchemaProvide } from '../schemas/tag-users';

@Injectable()
export class TagUsersRepository {
    constructor(@InjectModel(TagUsersSchemaProvide) private tagUsersModel: Model<TagUsers>) {}

    public savingTagToUser(key: string, userId: string): Observable<TagUsers> {
        return from(
            this.tagUsersModel.findOneAndUpdate(
                { key },
                {
                    $push: {
                        users: userId,
                    },
                },
                {
                    new: true,
                    upsert: true,
                },
            ),
        );
    }

    public getTagsByUser(userId: string): Observable<{ key: string }[]> {
        return from(this.tagUsersModel.find({ users: userId }).select('key'));
    }
}
