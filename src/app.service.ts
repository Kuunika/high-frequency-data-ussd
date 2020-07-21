import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthenticatePhoneNumberService } from './common/helpers/authenticate-phone-number/authenticate-phone-number.service';
import { UssdDto } from './common/dtos/ussd.dto';
import { IPermittedUser } from './common/interfaces/permitted-user.interface';
import { UssdHeader, ussdResponseMessage, parseTextFromUssd} from './common/helpers/ussd-utilities';
import { InitialScreen } from './screens/initial.screen';

@Injectable()
export class AppService {

  constructor(private authenticatePhoneNumberService: AuthenticatePhoneNumberService, private initialDialogScreen: InitialScreen) {}

  async highFrequencyDataCollectionUssdSession(ussdDto: UssdDto): Promise<string>{

    try {
      const authenticatedUser = await this.authenticatePhoneNumberService.authenticatePhoneNumber(ussdDto.phoneNumber, false);
      const parsedUssdRequestText = parseTextFromUssd(ussdDto.text);
      
      return this.initialDialogScreen.initialScreen({
        permittedUser: authenticatedUser,
        ussdTextInput: parsedUssdRequestText,
      });

    } catch (error) {
      
      throw new UnauthorizedException('Unauthorized Number');

    }
  }


}
