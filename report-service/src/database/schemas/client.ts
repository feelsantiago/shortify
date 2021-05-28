import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location, LocationSchema } from './location';

@Schema({ timestamps: true })
export class Client extends Document {
    public _id: string;

    @Prop({ type: String, required: true })
    public name: string;

    @Prop({ type: LocationSchema })
    public location: Location;

    @Prop({ type: String, required: true, select: false })
    public secret: string;

    @Prop({ type: Types.ObjectId, required: true })
    public user_id: Types.ObjectId;
}

export const ClientSchemaProvide = Symbol('ClientSchemaProvide').toString();

export const ClientSchema = SchemaFactory.createForClass(Client);
