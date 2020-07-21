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
import * as dotenv from 'dotenv';
import { VerifiedNumberModule } from './verified-number/verified-number.module';
import { DataEntryPermission, DataEntryPermissionSchema } from './common/schema/data-entry-permission.schema';
import { InitialScreen } from './screens/initial.screen';
import { LogisticsDialogScreen } from './screens/logistics-screens/logistics.screen';
import { CollectedData, CollectedDataSchema } from './common/schema/collected_data.schema';
import { Question, QuestionSchema } from './common/schema/question.schema';
import { QuestionCategory, QuestionCategorySchema } from './common/schema/question_category.schema';
import { QuestionService } from './common/schema/question/question.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';

dotenv.config();

const mongoUri = process.env.NODE_ENV === 'PRODUCTION' ? process.env.MONGODBPROD : process.env.MONGODB;

@Module({
  imports: [
    AggregateModule,
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports:[
        new winston.transports.File({ dirname: path.join(__dirname, './log/error/'), filename: 'error.log', level: 'error' }),
        new winston.transports.File({ dirname: path.join(__dirname, './log/info/'), filename: 'info.log', level: 'info' }),
        new winston.transports.File({ dirname: path.join(__dirname, './log/warn/'), filename: 'warn.log', level: 'warn' }),
      ]
    }),
    MongooseModule.forRoot(
      mongoUri
    ),
    MongooseModule.forFeature([
      { name: PermittedUser.name, schema: PermittedUserSchema },
      { name: Facility.name, schema: FacilitySchema },
      { name: DataEntryPermission.name, schema: DataEntryPermissionSchema },
      { name: CollectedData.name, schema: CollectedDataSchema },
      { name: Question.name, schema: QuestionSchema},
      { name: QuestionCategory.name, schema: QuestionCategorySchema}
    ]),
    VerifiedNumberModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticatePhoneNumberService, QuestionService,PermittedUserService, InitialScreen, LogisticsDialogScreen],
})
export class AppModule {}
