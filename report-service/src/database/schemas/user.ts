import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    public _id: string;

    @Prop({ type: String, required: true })
    public name: string;

    @Prop({ type: String, required: true })
    public email: string;

    @Prop({ type: String, required: true })
    public role: string;

    @Prop({ type: [String] })
    public claims: string[];
}

export const UserSchemaProvide = Symbol('UserSchemaProvide').toString();

export const UserSchema = SchemaFactory.createForClass(User);
