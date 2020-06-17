import { Injectable } from '@nestjs/common';
import { AuthenticatePhoneNumberService } from './common/helpers/authenticate-phone-number/authenticate-phone-number.service';
import { UssdDto } from './common/dtos/ussd.dto';
import { IPermittedUser } from './common/interfaces/permitted-user.interface';
import { UssdHeader, ussdResponseMessage, parseTextFromUssd} from './common/helpers/ussd-utilities'

@Injectable()
export class AppService {

  constructor(private authenticatePhoneNumberService: AuthenticatePhoneNumberService) {}

  async highFrequencyDataCollectionUssdSession(ussdDto: UssdDto): Promise<string>{
    try {
      const authenticatedUser = await this.authenticatePhoneNumberService.authenticatePhoneNumber(ussdDto.phoneNumber);
      const parsedUssdRequestText = parseTextFromUssd(ussdDto.text);

      return ussdResponseMessage(UssdHeader.END, `Hello ${authenticatedUser.firstName}`);

    } catch (error) {

      console.warn(`${Date()}: UNAUTHORIZED request made from phone number:${ussdDto.phoneNumber}`);
      return error.message;

    }
  }


}
