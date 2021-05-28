import { Metadata } from 'grpc';

export interface LoggerData {
    tag: string;
    metadata: Metadata;
}
