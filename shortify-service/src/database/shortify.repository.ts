import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from } from 'rxjs';
import { LinkSchemaProvide, Link } from './schemas/link';
import { ActivityDetails } from './schemas/activity-details';

@Injectable()
export class ShortifyRepository {
    constructor(@InjectModel(LinkSchemaProvide) private LinkModel: Model<Link>) {}

    public createLink(link: Partial<Link>): Observable<Link> {
        return from(this.LinkModel.create(link as Link));
    }

    public findOne(data: string): Observable<Link> {
        return from(this.LinkModel.findOne({ tac: data }));
    }

    public addActivityOnLink(link: Link, activity: ActivityDetails): Observable<Link> {
        return from(
            this.LinkModel.findByIdAndUpdate(
                link._id,
                {
                    $inc: {
                        clicks: 1,
                    },
                    $push: { activities: activity },
                },
                { new: true },
            ),
        );
    }
}
