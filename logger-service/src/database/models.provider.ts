import { ModelDefinition } from '@nestjs/mongoose';
import { LogSchemaProvider, LogSchema } from './schemas/log.schema';

export const modelsProviders: ModelDefinition[] = [
    {
        name: LogSchemaProvider,
        schema: LogSchema,
        collection: 'logs',
    },
];
