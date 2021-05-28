import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TagUsers extends Document {
    @Prop({ required: true, unique: true })
    public key: string;

    @Prop({ default: [] })
    public users: string[];
}

export const TagUsersSchemaProvide = Symbol('TagUsersSchemaProvide').toString();

export const TagUsersSchema = SchemaFactory.createForClass(TagUsers);
