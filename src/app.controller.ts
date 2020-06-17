import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UssdDto } from './common/dtos/ussd.dto';


//TODO: Set Up Content-Type
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  highFrequencyDataCollectionUssdSession(@Body() ussdDto: UssdDto): Promise<string> {
    return this.appService.highFrequencyDataCollectionUssdSession(ussdDto);
  }

  @Get()
  placeholderEndpoint(){
    return 'This is an example';
  }
}
