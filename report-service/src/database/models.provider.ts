import { ModelDefinition, AsyncModelFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LinkSchema, LinkSchemaProvide, Link } from './schemas/link';
import { UserSchema, UserSchemaProvide } from './schemas/user';
import { ClientSchema, ClientSchemaProvide } from './schemas/client';
import { TagUsersSchema, TagUsersSchemaProvide } from './schemas/tag-users';

export const modelsProvider: ModelDefinition[] = [
    {
        name: UserSchemaProvide,
        schema: UserSchema,
        collection: 'users',
    },
    {
        name: ClientSchemaProvide,
        schema: ClientSchema,
        collection: 'clients',
    },
    {
        name: TagUsersSchemaProvide,
        schema: TagUsersSchema,
        collection: 'tag-users',
    },
];

export const modelsAsyncProvider: AsyncModelFactory[] = [
    {
        name: LinkSchemaProvide,
        useFactory: (): unknown => {
            const schema = LinkSchema;
            schema.pre<Link>('save', function () {
                if (typeof this.user_id === 'string') {
                    this.user_id = Types.ObjectId(this.user_id);
                }
            });
            return schema;
        },
        collection: 'links',
    },
];
