import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from './location';

@Schema({ timestamps: true })
export class Client extends Document {
    public id: string;

    @Prop({ required: true })
    public name: string;

    @Prop({ type: Location })
    public location: Location;

    @Prop({ required: true, select: false })
    public secret: string;

    @Prop({ type: Types.ObjectId })
    public user_id: Types.ObjectId;

    public updatedAt?: Date;

    public createdAt?: Date;
}

export const ClientSchemaProvider = Symbol('ClientSchemaProvider').toString();

export const ClientSchema = SchemaFactory.createForClass(Client);
