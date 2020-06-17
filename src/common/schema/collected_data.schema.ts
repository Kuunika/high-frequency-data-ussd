import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'collected_data'
})
export class CollectedData extends Document {
    @Prop([raw({
        question: { type: String },
        answer: { type: Number }
      })])
    collected_data: Record<string, any>;

    data_collection_for_date: Date;
    
    facility: Types.ObjectId;

    question_category: Types.ObjectId;
}

export const CollectedDataSchema = SchemaFactory.createForClass(CollectedData);