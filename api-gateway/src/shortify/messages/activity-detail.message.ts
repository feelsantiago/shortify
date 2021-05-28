export interface ActivityDetailMessage {
    host: string;
    user_agent: string;
    accept: string;
    accept_language: string | string[];
    referer: string;
    ip: string;
    description: string;
    activity_track_id: string;
}
