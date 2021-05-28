export type Groups = 'campaign' | 'channel';

export interface ReportLinks {
    total_links: number;
    total_clicks: number;
}

export interface ReportLinksGroup extends ReportLinks {
    campaign?: string;
    channel?: string;
}

export interface ReportLinksTag extends ReportLinks {
    key: string;
}
