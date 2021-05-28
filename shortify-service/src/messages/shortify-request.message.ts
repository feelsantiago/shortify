import { Tag } from '../database/schemas/tag';

export interface ShortifyRequestMessage {
    original_url: string;
    channel: string;
    asset: string;
    campaign?: string;
    user_id: string;
    tags?: Tag[];
}
