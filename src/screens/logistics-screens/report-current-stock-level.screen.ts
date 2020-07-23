import { IQuestion } from "../../common/interfaces/question.interface";
import { UssdRequest } from "../../common/interfaces/ussd-request.interface";
import { UssdHeader, ussdResponseMessage } from "../../common/helpers/ussd-utilities";
import { Injectable } from "@nestjs/common";
import { QuestionService } from "../../common/schema/question/question.service";
import { ProductsListScreen } from "./products-list.screen";

@Injectable()
export class ReportCurrentStockLevel{
    
    constructor(private questionService: QuestionService) {}

    async display(ussdRequest: UssdRequest,question: IQuestion, productsListScreen: ProductsListScreen){
        if (ussdRequest.ussdTextInput.length === 0) {
            if (question.question === 'Comment') {
              return ussdResponseMessage(UssdHeader.CON, `Enter A Comment`);
            }
            return ussdResponseMessage(
              UssdHeader.CON,
              `Enter Stock for:\n${question.question}`,
            );
        }

        if (ussdRequest.ussdTextInput.length === 1) {
            const userAnswer = ussdRequest.ussdTextInput.shift();
            this.questionService.enterUssdQuestionData(question,ussdRequest.permittedUser.facility,userAnswer, ussdRequest.dataEntryDate);
        }

        if (ussdRequest.ussdTextInput.length > 1) {
            ussdRequest.ussdTextInput.shift();
        }

        return productsListScreen.display(ussdRequest, question.questionCategory);
    }
}