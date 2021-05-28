import { ModelDefinition } from '@nestjs/mongoose';
import { ClientSchema, ClientSchemaProvider } from './schemas/client';

export const modelsProviders: ModelDefinition[] = [
    {
        name: ClientSchemaProvider,
        schema: ClientSchema,
        collection: 'clients',
    },
];
