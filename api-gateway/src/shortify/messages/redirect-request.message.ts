import { ActivityDetailMessage } from './activity-detail.message';

export interface RedirectRequestMessage {
    tac: string;
    activity: ActivityDetailMessage;
}
