import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionCategory } from '../question_category.schema';
import { Model } from 'mongoose';
import { Question } from '../question.schema';
import { CollectedData } from '../collected_data.schema';
import { IFacility } from '../../../common/interfaces/facility.interface';
import { IQuestion } from '../../../common/interfaces/question.interface';
import { format, lastDayOfWeek, subDays } from 'date-fns';
import { UssdRequest } from '../../../common/interfaces/ussd-request.interface';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionCategory.name)
    private questionCategoryModel: Model<QuestionCategory>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(CollectedData.name) private collectedDataModel: Model<CollectedData>
  ) {}

  async getAllQuestionsFromCategory(categoryID: string, ussdRequest: UssdRequest): Promise<IQuestion[]>{
    const questionCategory = await this.questionCategoryModel.findById(categoryID).exec();
    
    if(questionCategory === null) throw new Error('Category Not Found');

    // eslint-disable-next-line @typescript-eslint/camelcase
    const questions = await this.questionModel.find({question_category: questionCategory._id}).exec();
  

    if(questions === null || questions.length === 0) throw new Error('No Questions found');

    const today = format(lastDayOfWeek(ussdRequest.dataEntryDate, {weekStartsOn:2}), 'yyyy-MM-dd');
    // eslint-disable-next-line @typescript-eslint/camelcase
    const completedAnswer = await this.collectedDataModel.find({data_collection_for_date:today, facility: ussdRequest.permittedUser.facility.id}).exec();
    console.log(today);


    return questions.map(question => {
        const answer = completedAnswer.find(completed => completed.question.toHexString() === question._id.toHexString())?.answer;

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

  

  async enterUssdQuestionData(question: IQuestion, facility: IFacility, answer: string, dateOfEntry: Date){
      // check if data for that day has already been entered
      const today = format(lastDayOfWeek(dateOfEntry ?? new Date(),{weekStartsOn:2}), 'yyyy-MM-dd');

      // eslint-disable-next-line @typescript-eslint/camelcase
      const completedAnswer = await this.collectedDataModel.findOne({question: question.id, data_collection_for_date:today, facility: facility.id}).exec();
      if(completedAnswer !== null){
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


  async reportStockOut(question: IQuestion, facility: IFacility, answer: string, dateOfEntry: Date){


  }

  async getBackDataEntryDates(facility: IFacility){
    const thisWeek = format(lastDayOfWeek(new Date(2020,6,21),{weekStartsOn:2}),'yyyy-MM-dd');
    const lastWeek = format(subDays(new Date(thisWeek), 7),'yyyy-MM-dd');

    const lastWeeksAnswers = await this.collectedDataModel.find({facility: facility.id, data_collection_for_date: lastWeek}).exec();

    if(lastWeeksAnswers.length < 16){
      return {
        thisWeek,
        lastWeek
      }
    }

    return {
      thisWeek,
      lastWeek: undefined
    }

  }
}
