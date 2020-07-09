import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionCategory } from '../question_category.schema';
import { Model } from 'mongoose';
import { Question } from '../question.schema';
import { CollectedData } from '../collected_data.schema';
import { IPermittedUser } from 'src/common/interfaces/permitted-user.interface';
import { IFacility } from 'src/common/interfaces/facility.interface';
import { IQuestion } from 'src/common/interfaces/question.interface';
import { format } from 'date-fns';
import { UssdRequest } from 'src/common/interfaces/ussd-request.interface';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionCategory.name)
    private questionCategoryModel: Model<QuestionCategory>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(CollectedData.name) private collectedDataModel: Model<CollectedData>
  ) {}

  async getAllQuestionsFromCategory(Category: string, ussdRequest: UssdRequest): Promise<IQuestion[]>{
    const questionCategory = await this.questionCategoryModel.findOne({Category}).exec();
    
    if(questionCategory === null) throw new Error('Category Not Found');

    // eslint-disable-next-line @typescript-eslint/camelcase
    const questions = await this.questionModel.find({question_category: questionCategory._id}).exec();

    if(questions === null || questions.length === 0) throw new Error('No Questions found');

    const today = format(new Date(), 'yyyy-MM-dd');
    // eslint-disable-next-line @typescript-eslint/camelcase
    const completedAnswer = await this.collectedDataModel.find({data_collection_for_date:today, facility: ussdRequest.permittedUser.facility.id}).exec();

    return questions.map(question => {
        const answer = completedAnswer.find(completed => completed.question_category === question.question_category)?.answer;
        console.log(answer);
        return {
            id: question._id,
            question: question.question,
            questionNumber: question.question_number,
            acceptedValueType: question.accepted_value,
            questionCategoryId: questionCategory._id,
            questionCategory: questionCategory.Category,
            answer: answer ? answer : '',
        }
    });
  }

  async enterUssdQuestionData(question: IQuestion, facility: IFacility, answer: string){
      // check if data for that day has already been entered
      const today = format(new Date(), 'yyyy-MM-dd');
      // eslint-disable-next-line @typescript-eslint/camelcase
      const completedAnswer = await this.collectedDataModel.findOne({question: question.id, data_collection_for_date:today, facility: facility.id}).exec();
      if(completedAnswer !== null){
        console.log('Question Exists');
        completedAnswer.answer = answer;
        completedAnswer.updatedAt = new Date();
        completedAnswer.save();
        return true;
      }

      // else create new one
      const newAnswer = new this.collectedDataModel();
      newAnswer.answer = answer;
      newAnswer.question = question.id;
      // eslint-disable-next-line @typescript-eslint/camelcase
      newAnswer.data_collection_for_date = today;
      newAnswer.facility = facility.id;
      // eslint-disable-next-line @typescript-eslint/camelcase
      newAnswer.question_category = question.questionCategoryId;
      newAnswer.createdAt = new Date();
      newAnswer.updatedAt = new Date();
      newAnswer.save();

      return true;


      // check if answers has the existing question inside

      // if some over wite the answer 

      // otherwise add new answer
  }

}
