import { Injectable } from '@nestjs/common';
import { MetadataInfo } from './messages/log.messages';

const prefix = 'tag=';

@Injectable()
export class AppService {
    public flatMetadata(metadata: MetadataInfo): MetadataInfo {
        const entries = Object.values(metadata);
        return entries.reduce((acc: Record<string, unknown>, next) => {
            let result: MetadataInfo = {};

            if (typeof next === 'object' || Array.isArray(next)) {
                result = { ...acc, ...next };
            }

            return result;
        }, {}) as MetadataInfo;
    }

    public getMetadataContextAndTag(metadata: Record<string, unknown>): [string, string, MetadataInfo] {
        if ('context' in metadata) {
            const { context, ...other } = metadata;
            const [tag, result] = this.getTagProperty(other);
            return [(context as string).trim(), tag, result];
        }

        const [tag, result] = this.getTagProperty(metadata);
        return ['no-context', tag, result];
    }

    private getTagProperty(metadata: Record<string, unknown>): [string, MetadataInfo] {
        const values = Object.values(metadata);
        const hasTag: string = values.find((value) => typeof value === 'string' && value.includes(prefix)) as string;

        if (!hasTag) {
            return ['untagged', metadata];
        }

        const tag: string = hasTag.split(prefix).pop();
        return [tag, metadata];
    }
}
