import { Controller, Post, Body } from '@nestjs/common';
import { LogisticService } from './logistic.service';
import { UssdDto } from 'src/common/dtos/ussd.dto';

@Controller('logistic')
export class LogisticController {
    /**
     *
     */
    constructor(private readonly logisticService: LogisticService) {}

    @Post()
    ussdRequest(@Body() ussdDto: UssdDto): string{
        return this.logisticService.request(ussdDto);
    }
}
