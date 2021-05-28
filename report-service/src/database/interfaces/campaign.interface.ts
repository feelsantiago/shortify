import { Link } from '../schemas/link';

export interface Campaign {
    clicks: number;
    name: string;
    links: Link[];
}
