import { Injectable } from "@nestjs/common";
import { ProductsListScreen } from "./products-list.screen";
import { UssdRequest } from "../../common/interfaces/ussd-request.interface";
import { ussdResponseMessage, UssdHeader } from "../../common/helpers/ussd-utilities";

@Injectable()
export class InvalidOptionSelectedScreen{

    constructor() {}

    display(ussdRequest: UssdRequest, selectedQuestionCategory: string, productListScreen: ProductsListScreen){
        if (ussdRequest.ussdTextInput.length === 0) {
            return ussdResponseMessage(
              UssdHeader.CON,
              'Invalid Option Selected\nEnter 1 to return to the Home Screen',
            );
          }
      
          ussdRequest.ussdTextInput.shift();
      
          return productListScreen.display(ussdRequest, selectedQuestionCategory);
    }

}