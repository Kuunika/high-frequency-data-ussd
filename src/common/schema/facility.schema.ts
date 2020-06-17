import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    collection: 'facilities'
})
export class Facility extends Document {
    @Prop()
    facility_name: string;

    @Prop()
    facility_code: string;
}

export const FacilitySchema = SchemaFactory.createForClass(Facility);