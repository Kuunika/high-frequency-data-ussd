import { Injectable } from '@nestjs/common';
import { UssdRequest } from '../../common/interfaces/ussd-request.interface';
import { QuestionCategory } from '../../common/schema/question_category.schema';
import { UssdHeader, ussdResponseMessage, genericUssdErrorMessage } from '../../common/helpers/ussd-utilities';
import { IQuestion } from '../../common/interfaces/question.interface';
import { QuestionService } from '../../common/schema/question/question.service';
import { QuestionCategoryService } from '../../common/schema/question-category/question-category.service';
import * as _ from 'lodash';
import { ReportStockOutScreen } from './report-stock-out.screen';
import { InvalidOptionSelectedScreen } from './invalid-option-selected.screen';
import { ReportCurrentStockLevel } from './report-current-stock-level.screen';

// what the class need to do
//List questions and pass selected question to be answered

@Injectable()
export class ProductsListScreen {

    constructor(private questionService: QuestionService, 
                private questionCategoryService: QuestionCategoryService,
                private reportStockOutScreen: ReportStockOutScreen,
                private reportCurrentStockLevel: ReportCurrentStockLevel,
                private invalidOptionSelectedScreen: InvalidOptionSelectedScreen,
                ) {}

    async display(ussdRequest: UssdRequest, selectedQuestionCategory: string, pageNumber = 1): Promise<string>{
        
        const userSelectedOption = ussdRequest.ussdTextInput.shift();

        //TODO: Find way to optimise. Current version make large number of request to db.

        const questionCategory = await this.getQuestionCategory(selectedQuestionCategory);
        
        if(questionCategory === null){
            return genericUssdErrorMessage();
        }

        const questions = await this.getQuestions(questionCategory, ussdRequest, pageNumber);
        
        if(userSelectedOption){

            if(userSelectedOption === 'N' || userSelectedOption === 'n' && pageNumber === 1){
                return this.display(ussdRequest, selectedQuestionCategory, 2);
            }

            if (userSelectedOption === 'B' || userSelectedOption === 'b' && pageNumber === 2) {

                return this.display(ussdRequest, selectedQuestionCategory, 1);
            }

            if(userSelectedOption === 'E' || userSelectedOption === 'e' || userSelectedOption === 'Exit' || userSelectedOption === 'exit'){
                return ussdResponseMessage(UssdHeader.END, "Thank You");
            }
            
            const selectedQuestion = questions.find(
                options => options.questionNumber === Number.parseInt(userSelectedOption),
            );

            if(selectedQuestion === undefined){
                return this.invalidOptionSelectedScreen.display(ussdRequest, questionCategory.Category, this);
            }

            if(questionCategory.Category === 'Logistics: Facility-Wide Stock Out'){
               return this.reportStockOutScreen.display(ussdRequest, selectedQuestion, this);
            }

            return this.reportCurrentStockLevel.display(ussdRequest, selectedQuestion, this);

        }
        

        const screenText = this.createUssdScreenText(questions, this.getCategoryName(questionCategory), pageNumber);
        
        return ussdResponseMessage(UssdHeader.CON, screenText);
    }


    private async getQuestionCategory(selectedQuestionCategory: string): Promise<QuestionCategory>{
        return this.questionCategoryService.getQuestionCategoryByName(selectedQuestionCategory);
    }


    private async getQuestions(questionCategory: QuestionCategory,ussdRequest: UssdRequest, pageNumber: number): Promise<IQuestion[]>{
        const allQuestions = await this.questionService.getAllQuestionsFromCategory(questionCategory._id, ussdRequest);
        return _.chunk(allQuestions.sort((a,b) => a.questionNumber - b.questionNumber),5)[pageNumber - 1];
    }


    private createUssdScreenText(questions: IQuestion[], category: string, pageNumber: number){
        const navigationOptionText = pageNumber === 1 ? 'N to go to the next page' : 'B to go Back';
        
        const selectableQuestionsPageText = questions
            .sort((a,b) => a.questionNumber - b.questionNumber)
            .map(message => {
                if (message.question === 'Comment'){
                    return `${message.questionNumber + '. ' + message.question + ':' + 'Added'}\n`;
                }
                return `${message.questionNumber + '. ' + message.question + ':' + message.answer}\n`
            })
            .join('');

        return `${category}\n${selectableQuestionsPageText}\n${navigationOptionText}\nE to Exit`;
    }
    

    private getCategoryName(questionCategory: QuestionCategory): string{
        return questionCategory.Category.split(':')[1].trim();
    }
}
