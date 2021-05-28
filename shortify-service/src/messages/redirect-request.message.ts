import { ActivityDetails } from '../database/schemas/activity-details';

export interface RedirectRequestMessage {
    tac: string;
    activity: ActivityDetails;
}
