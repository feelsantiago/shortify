import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    ReportLinks,
    Groups,
    ReportLinksGroup,
    ReportLinksTag,
} from '../../shortify/interfaces/report-links.interface';
import { Link, LinkSchemaProvide } from '../schemas/link';
import { ActivityDetails } from '../schemas/activity-details';

interface clicksAndActivities {
    clicks: number;
    activities: ActivityDetails;
}

@Injectable()
export class ShortifyRepository {
    constructor(@InjectModel(LinkSchemaProvide) private LinkModel: Model<Link>) {}

    public createLink(link: Link): Observable<Link> {
        return from(this.LinkModel.create(link));
    }

    public findAllLinks(campaign: string, user_id: string): Observable<Link[]> {
        const links = this.LinkModel.find({ campaign, user_id }).select('-activities');
        return from(links);
    }

    public findOne(tac: string, user_id: string): Observable<Link> {
        return from(this.LinkModel.findOne({ tac, user_id }));
    }

    public findByIdAndUpdate(linkId: string, clicksAndActivities: clicksAndActivities): Observable<Link> {
        return from(
            this.LinkModel.findOneAndUpdate(
                { tac: linkId },
                {
                    $push: {
                        activities: clicksAndActivities.activities,
                    },
                    $inc: {
                        clicks: 1,
                    },
                },
                { new: true },
            ),
        );
    }

    public getReportLinks(user_id: string): Observable<ReportLinks> {
        return from(
            this.LinkModel.aggregate<ReportLinks>()
                .match({ user_id: Types.ObjectId(user_id) })
                .group({
                    _id: undefined,
                    total_clicks: {
                        $sum: '$clicks',
                    },
                    total_links: {
                        $sum: 1,
                    },
                })
                .project({ _id: 0 }),
        ).pipe(map((result) => result.pop()));
    }

    public getReportLinksByGroup(user_id: string, group: Groups): Observable<ReportLinksGroup[]> {
        const projectFilter = { _id: 0, total_clicks: 1, total_links: 1 };
        projectFilter[group] = '$_id';
        return from(
            this.LinkModel.aggregate<ReportLinksGroup>()
                .match({ user_id: Types.ObjectId(user_id) })
                .group({
                    _id: `$${group}`,
                    total_clicks: {
                        $sum: '$clicks',
                    },
                    total_links: {
                        $sum: 1,
                    },
                })
                .project(projectFilter),
        );
    }

    public getReportLinksByTag(user_id: string, keys: string[]): Observable<ReportLinksTag[]> {
        return from(
            this.LinkModel.aggregate<ReportLinksTag>()
                .match({ user_id: Types.ObjectId(user_id), 'tags.key': { $in: keys } })
                .unwind('tags')
                .group({
                    _id: '$_id',
                    tags: { $addToSet: '$tags.key' },
                    clicks: { $first: '$clicks' },
                })
                .unwind('tags')
                .match({ tags: { $in: keys } })
                .group({
                    _id: '$tags',
                    total_links: { $sum: 1 },
                    total_clicks: { $sum: '$clicks' },
                })
                .project({
                    _id: 0,
                    key: '$_id',
                    total_links: 1,
                    total_clicks: 1,
                }),
        );
    }
}
