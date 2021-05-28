import { AsyncModelFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema, UserSchemaProvide, User } from './schemas/user.schema';

export const modelsProviders: AsyncModelFactory[] = [
    {
        name: UserSchemaProvide,
        collection: 'users',
        useFactory: (): unknown => {
            const schema = UserSchema;
            schema.pre<User>('save', async function () {
                if (this.isModified('password')) {
                    const salt: string = await bcrypt.genSalt(5);
                    this.password = await bcrypt.hash(this.password, salt);
                }
            });
            return schema;
        },
    },
];
