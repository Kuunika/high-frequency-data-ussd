import { Injectable } from "@nestjs/common";
import { UssdRequest } from "../../common/interfaces/ussd-request.interface";
import { IQuestion } from "../../common/interfaces/question.interface";
import { ussdResponseMessage, UssdHeader } from "../../common/helpers/ussd-utilities";
import { QuestionService } from "../../common/schema/question/question.service";
import { ProductsListScreen } from "./products-list.screen";

@Injectable()
export class ReportStockOutScreen {
    
    constructor(private questionService: QuestionService) {}

    async display(ussdRequest: UssdRequest, question: IQuestion, productsListScreen: ProductsListScreen){
        //initial
    if (ussdRequest.ussdTextInput.length === 0) {
        return ussdResponseMessage(
          UssdHeader.CON,
          `Have you confirmed that there is no stock of this product in the pharmacy?\nYes or No`,
        );
      }
  
      //entry
      if (ussdRequest.ussdTextInput.length === 1) {
        return ussdResponseMessage(
          UssdHeader.CON,
          `Have you confirmed that there is no stock of this product at the points of care?\nYes or No`,
        );
      }
  
      if (ussdRequest.ussdTextInput.length === 2) {
        const userAnswerPharmacy = ussdRequest.ussdTextInput.shift()
        const userAnswerPointOfCare = ussdRequest.ussdTextInput.shift();
        this.questionService.enterUssdQuestionData(question, ussdRequest.permittedUser.facility, `Confirm at pharmacy ${userAnswerPharmacy} - Confirmed at point of care ${userAnswerPointOfCare}`, ussdRequest.dataEntryDate);
        
      }
  
      //skip
      if (ussdRequest.ussdTextInput.length > 2) {
        ussdRequest.ussdTextInput.shift();
        ussdRequest.ussdTextInput.shift();
        
      }

      return productsListScreen.display(ussdRequest, question.questionCategory);
    }
}