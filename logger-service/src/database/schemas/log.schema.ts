import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, strict: false })
export class Log extends Document {
    @Prop({ required: true })
    public level: string;

    @Prop({ required: true })
    public tag: string;

    @Prop({ required: true })
    public message: string;

    @Prop({ required: true })
    public timestamp: string;

    @Prop({ required: true })
    public service: string;

    @Prop({ required: false })
    public context: string;

    @Prop()
    public metadata: { [key: string]: unknown };
}

export const LogSchemaProvider = Symbol('LogSchemaProvider').toString();

export const LogSchema = SchemaFactory.createForClass(Log);
