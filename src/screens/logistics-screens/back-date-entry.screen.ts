import { Injectable } from "@nestjs/common";
import { QuestionService } from "src/common/schema/question/question.service";
import { UssdRequest } from "src/common/interfaces/ussd-request.interface";
import { LogisticsInitialScreen } from "./logistics-initial.screen";
import { ussdResponseMessage, UssdHeader } from "src/common/helpers/ussd-utilities";

@Injectable()
export class BackDateEntryScreen {
    
    constructor(private questionService: QuestionService, private logisticsInitialScreen:LogisticsInitialScreen) {}

    async display(ussdRequest: UssdRequest){

        console.log(ussdRequest.ussdTextInput);

        const backDataEntryDates = await this.questionService.getBackDataEntryDates(ussdRequest.permittedUser.facility);
        
        if(backDataEntryDates.lastWeek === undefined){
            return this.logisticsInitialScreen.display(ussdRequest)
        }

        const selectedDate = ussdRequest.ussdTextInput.shift();
        
        if(selectedDate === undefined){
            console.log("Inside");
            return ussdResponseMessage(UssdHeader.CON, `Data Missing from last week\n1. Enter For Last Week\n2. Enter Data For this week`);
        }

        ussdRequest.dataEntryDate = new Date(selectedDate === '1' ? backDataEntryDates.lastWeek : backDataEntryDates.thisWeek);
        
        return this.logisticsInitialScreen.display(ussdRequest);
    }
}