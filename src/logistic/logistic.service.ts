import { Injectable } from '@nestjs/common';
import { InitialDialogScreen } from 'src/screens/logistic-screens/initial-dialog.screen';
import { UssdDto } from 'src/common/dtos/ussd.dto';
import { UssdHeader, ussdResponseMessage, parseTextFromUssd} from '../common/helpers/ussd-utilities'


@Injectable()
export class LogisticService {

    constructor(private readonly initialDialogScreen: InitialDialogScreen){}

    request(ussdDto: UssdDto){
        const parsedUssdRequestText = parseTextFromUssd(ussdDto.text);
        return this.initialDialogScreen.display(parsedUssdRequestText);
    }
}
