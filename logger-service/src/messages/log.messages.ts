export interface MetadataInfo {
    [key: string]: unknown;
}

export interface LogMessage {
    level: 'log' | 'info' | 'warning' | 'error' | 'debug';
    message: string;
    label: string;
    timestamp: string;
    metadata: MetadataInfo;
}
