import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Location {
    @Prop({ required: true })
    public address: string;

    @Prop({ required: true })
    public city: string;

    @Prop({ required: true })
    public province: string;

    @Prop({ required: true })
    public country: string;

    @Prop({ required: true })
    public postal_code: string;
}
