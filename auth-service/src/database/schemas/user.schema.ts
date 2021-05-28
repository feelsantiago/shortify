import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
    public id: string;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true })
    public password: string;

    @Prop({ required: true })
    public role: string;

    @Prop([String])
    public claims: string[];
}

export const UserSchemaProvide = Symbol('UserSchemaProvider').toString();

export const UserSchema = SchemaFactory.createForClass(User);
