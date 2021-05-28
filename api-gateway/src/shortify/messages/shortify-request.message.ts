import { TagMessage } from './tag.message';

export interface ShortifyRequestMessage {
    original_url: string;
    channel: string;
    asset?: string;
    campaign?: string;
    user_id: string;
    tags?: Array<TagMessage>;
}
