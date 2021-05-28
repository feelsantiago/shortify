import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ActivityDetails, ActivityDetailsSchema } from './activity-details';
import { Tag, TagSchema } from './tag';

@Schema({ timestamps: true })
export class Link extends Document {
    public _id: string;

    @Prop({ type: String, required: true })
    public tac: string;

    @Prop({ type: String, required: true })
    public original_url: string;

    @Prop({ type: String, required: true })
    public channel: string;

    @Prop({ type: Number, required: true, default: 0 })
    public clicks: number;

    @Prop({ type: String })
    public asset: string;

    @Prop({ type: String })
    public campaign: string;

    @Prop({ type: [ActivityDetailsSchema], select: false })
    public activities: ActivityDetails[];

    @Prop({ type: [TagSchema], required: true })
    public tags: Tag[];

    @Prop({ type: Types.ObjectId, required: true })
    public user_id: Types.ObjectId;
}

export const LinkSchemaProvide = Symbol('LinkSchemaProvide').toString();

export const LinkSchema = SchemaFactory.createForClass(Link);
