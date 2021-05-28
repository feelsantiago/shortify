import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Location {
    @Prop({ type: String, required: true })
    public address: string;

    @Prop({ type: String, required: true })
    public city: string;

    @Prop({ type: String, required: true })
    public province: string;

    @Prop({ type: String, required: true })
    public country: string;

    @Prop({ type: String, required: true })
    public postal_code: string;
}

export const LocationSchemaProvide = Symbol('LocationSchemaProvide').toString();

export const LocationSchema = SchemaFactory.createForClass(Location);
