import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionCategory } from '../question_category.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionCategoryService {

    constructor(@InjectModel(QuestionCategory.name) private questionCategoryModel: Model<QuestionCategory>) {}

    async getQuestionCategoryByName(questionCategoryName: string){
        return this.questionCategoryModel.findOne({Category: questionCategoryName}).exec();
    }
    
}
