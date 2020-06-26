import { Controller, Post, Body } from '@nestjs/common';
import { LogisticService } from './logistic.service';
import { UssdDto } from 'src/common/dtos/ussd.dto';
import { InitialDialogScreen } from 'src/screens/logistic-screens/initial-dialog.screen';
import { parseTextFromUssd } from 'src/common/helpers/ussd-utilities';

@Controller('logistic')
export class LogisticController {
    /**
     *
     */
    constructor(private readonly logisticService: LogisticService) {}

    @Post()
    ussdRequest(@Body() ussdDto: UssdDto){
        return this.logisticService.request(ussdDto);
    }
}
