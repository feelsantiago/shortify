import { ActivityDetailMessage } from './activity-detail.message';
import { TagMessage } from './tag.message';

export interface LinkMessage {
    tac: string;
    original_url: string;
    clicks: number;
    channel: string;
    asset: string;
    campaign: string;
    user_id: string;
    activities: Array<ActivityDetailMessage>;
    tags: Array<TagMessage>;
}
