import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    collection: 'questions'
})
export class Question extends Document {
    @Prop()
    question: string;

    @Prop()
    question_number: number;

    @Prop()
    question_category: Types.ObjectId;

    @Prop()
    accepted_value: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);