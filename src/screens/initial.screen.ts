import { Injectable } from '@nestjs/common';
import { UssdRequest } from 'src/common/interfaces/ussd-request.interface';
import { genericUssdErrorMessage, UssdHeader, ussdResponseMessage } from 'src/common/helpers/ussd-utilities';
import { LogisticsInitialScreen } from './logistics-screens/logistics-initial.screen';

@Injectable()
export class InitialScreen {
  constructor(
    private logisticsInitialScreen: LogisticsInitialScreen,
  ) {}

  async initialScreen(ussdRequest: UssdRequest): Promise<string> {
    if (ussdRequest.ussdTextInput.length === 0) {
      const initialDialog = ussdRequest.permittedUser.dataEntryPermissions
        .map((permission, index) => `${index + 1}: ${permission}`)
        .join('\n');
        console.log(initialDialog);
      return ussdResponseMessage(UssdHeader.CON,initialDialog);
    }
    const selectedOption = ussdRequest.ussdTextInput.shift();

    if(selectedOption === '1'){
        return this.logisticsInitialScreen.display(ussdRequest);
    }
    

    return genericUssdErrorMessage();
  }
}
