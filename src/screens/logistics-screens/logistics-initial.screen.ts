import { UssdRequest } from "../../common/interfaces/ussd-request.interface";
import { ussdResponseMessage, UssdHeader } from "../../common/helpers/ussd-utilities";
import { ProductsListScreen } from "./products-list.screen";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LogisticsInitialScreen{

    constructor(private productsListScreen: ProductsListScreen) {}

    display(ussdRequest: UssdRequest){
        if(ussdRequest.ussdTextInput.length === 0){
            return ussdResponseMessage(
                UssdHeader.CON,
                `Hello ${ussdRequest.permittedUser.firstName},
                \n1.Report Stock In Pharmacy\n2.Report Stock Point Of Care\n3.Report Facility Wide Stock Out`,
              );
        }

        const questionCategories = [
            'Logistics: In Pharmacy','Logistics: Point of Care','Logistics: Facility-Wide Stock Out'
        ];

        const selectedOption = +ussdRequest.ussdTextInput.shift();
        

        return this.productsListScreen.display(ussdRequest, questionCategories[selectedOption - 1], 1);
    }
}