import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UssdDto, AllSystemUssdDto } from './common/dtos/ussd.dto';
import { convertDtoPayload } from './common/helpers/ussd-utilities';


//TODO: Set Up Content-Type
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  highFrequencyDataCollectionUssdSession(@Body() allSystemsDto: AllSystemUssdDto): Promise<string> {
    console.log(allSystemsDto);
    const ussdDto = convertDtoPayload(allSystemsDto);
    console.log(ussdDto);
    return this.appService.highFrequencyDataCollectionUssdSession(ussdDto);
  }

  @Get()
  placeholderEndpoint(){
    return 'Welcome to the High Frequency Data Collection USSD API';
  }
}
