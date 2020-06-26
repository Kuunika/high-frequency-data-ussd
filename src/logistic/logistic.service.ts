import { Injectable } from '@nestjs/common';
import { UssdDto } from '../common/dtos/ussd.dto';
import { parseTextFromUssd } from '../common/helpers/ussd-utilities'
import { IPermittedUser } from '../common/interfaces/permitted-user.interface';
import { UssdRequest } from '../common/interfaces/ussd-request.interface';
import { LogisticsDialogScreen } from '../screens/new-logistics-screens/logistics.screen';


@Injectable()
export class LogisticService {
    
    constructor(private logisticsDialogScreen:LogisticsDialogScreen) {}

    request(ussdDto: UssdDto){
       const ussdRequest = this.createUssdRequestObject(ussdDto);
       return this.logisticsDialogScreen.display(ussdRequest);
    }

    // TODO: Create Seperate Service for the following two classes
    private getUser(phoneNumber: string): IPermittedUser{
        return {
            facility: {
                facilityCode: '',
                facilityName: '',
            },
            firstName: '',
            id: '',
            lastName: '',
            phoneNumber
        };
    }

    private createUssdRequestObject(ussdDto: UssdDto): UssdRequest{
        const ussdTextInput = parseTextFromUssd(ussdDto.text);
        const permittedUser = this.getUser(ussdDto.phoneNumber);

        return {
            permittedUser,
            ussdTextInput
        };
    }
}
