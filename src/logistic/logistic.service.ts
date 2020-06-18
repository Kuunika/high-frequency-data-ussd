import { Injectable } from '@nestjs/common';
import { InitialDialogScreen } from 'src/screens/logistic-screens/initial-dialog.screen';
import { UssdDto } from 'src/common/dtos/ussd.dto';
import { UssdHeader, ussdResponseMessage, parseTextFromUssd} from '../common/helpers/ussd-utilities'


@Injectable()
export class LogisticService {

    constructor(){}

    request(ussdDto: UssdDto){
        const initialDialogScreen = new InitialDialogScreen()
        const parsedUssdRequestText = parseTextFromUssd(ussdDto.text);
        return initialDialogScreen.display(parsedUssdRequestText);
    }
}
