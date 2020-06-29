import { Injectable } from '@nestjs/common';
import { AuthenticatePhoneNumberService } from 'src/common/helpers/authenticate-phone-number/authenticate-phone-number.service';
import { UssdRequest } from 'src/common/interfaces/ussd-request.interface';
import { LogisticsDialogScreen } from './new-logistics-screens/logistics.screen';
import { genericUssdErrorMessage } from 'src/common/helpers/ussd-utilities';

@Injectable()
export class InitialScreen {
  constructor(
    private authenticationService: AuthenticatePhoneNumberService,
    private logisticDialogScreen: LogisticsDialogScreen,
  ) {}

  async initialScreen(ussdRequest: UssdRequest): Promise<string> {
    if (ussdRequest.ussdTextInput.length === 0) {
      const initialDialog = ussdRequest.permittedUser.dataEntryPermissions
        .map((permission, index) => `${index + 1}: ${permission}`)
        .join('\n');
        console.log(initialDialog);
      return initialDialog;
    }
    const selectedOption = ussdRequest.ussdTextInput.shift();

    if(selectedOption === '1'){
        return this.logisticDialogScreen.display(ussdRequest);
    }
    

    return genericUssdErrorMessage();
  }
}
