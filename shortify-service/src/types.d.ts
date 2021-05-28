import { ActivityDetails } from './database/schemas/activity-details';
import { Link } from './database/schemas/link';

export type ShortEventPayload<T> = { [K in keyof T]: T[K] } & { tag: string };
export type ActivityDetailsLink = ActivityDetails & Pick<Link, 'tac' | 'clicks'>;
