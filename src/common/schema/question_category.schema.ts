import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    collection: 'question_categories'
})
export class QuestionCategory extends Document {
    @Prop()
    category: string;
}

export const QuestionCategorySchema = SchemaFactory.createForClass(QuestionCategory);