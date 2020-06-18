import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregateModule } from './aggregate/aggregate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticatePhoneNumberService } from './common/helpers/authenticate-phone-number/authenticate-phone-number.service';
import { PermittedUserService } from './common/schema/permitted-user/permitted-user.service';
import {
  PermittedUser,
  PermittedUserSchema,
} from './common/schema/permitted_user.schema';
import { Facility, FacilitySchema } from './common/schema/facility.schema';
import { SurveillanceModule } from './surveillance/surveillance.module';
import { LogisticModule } from './logistic/logistic.module';
import * as dotenv from 'dotenv';
import { HardCodedStockReport } from './screens/logistic-screens/hard-coded-stock-report';

dotenv.config();

@Module({
  imports: [
    AggregateModule,
    MongooseModule.forRoot(
      process.env.MONGODB,
    ),
    MongooseModule.forFeature([
      { name: PermittedUser.name, schema: PermittedUserSchema },
      { name: Facility.name, schema: FacilitySchema },
    ]),
    SurveillanceModule,
    LogisticModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticatePhoneNumberService, PermittedUserService],
})
export class AppModule {}
