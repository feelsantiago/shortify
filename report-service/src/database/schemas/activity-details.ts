import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ActivityDetails extends Document {
    public _id: string;

    @Prop({ type: String, required: true })
    public host: string;

    @Prop({ type: String, required: true })
    public user_agent: string;

    @Prop({ type: String, required: true })
    public accept: string;

    @Prop({ type: String, required: true })
    public accept_language: string;

    @Prop({ type: String, required: true })
    public referer: string;

    @Prop({ type: String, required: true })
    public ip: string;

    @Prop({ type: String, required: true })
    public activity_track_id: string;

    @Prop({ type: String, required: true })
    public description: string;

    @Prop({ type: Date, required: true })
    public created_at: Date;
}

export const ActivityDetailsSchemaProvide = Symbol('ActivityDetailsSchemaProvide').toString();

export const ActivityDetailsSchema = SchemaFactory.createForClass(ActivityDetails);
