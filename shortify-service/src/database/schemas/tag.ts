import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Tag extends Document {
    @Prop({ type: String })
    public key: string;

    @Prop({ type: String })
    public value: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
