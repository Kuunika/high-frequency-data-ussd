import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'collected_data'
})
export class CollectedData extends Document {
    @Prop()
    answer: string;
    @Prop()
    question: Types.ObjectId;
    @Prop()
    data_collection_for_date: string;
    @Prop()
    facility: Types.ObjectId;
    @Prop()
    question_category: Types.ObjectId;
    @Prop()
    createdAt:Date;
    @Prop()
    updatedAt: Date;
}

export const CollectedDataSchema = SchemaFactory.createForClass(CollectedData);