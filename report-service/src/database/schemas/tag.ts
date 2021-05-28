import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class Tag extends Document {
    @Prop({ type: String, required: true })
    public key: string;

    @Prop({ type: String, required: true })
    public value: string;
}

export const TagSchemaProvide = Symbol('TagSchemaProvide').toString();

export const TagSchema = SchemaFactory.createForClass(Tag);
