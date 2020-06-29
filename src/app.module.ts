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
import { VerifiedNumberModule } from './verified-number/verified-number.module';
import { DataEntryPermission, DataEntryPermissionSchema } from './common/schema/data-entry-permission.schema';
import { InitialScreen } from './screens/initial.screen';
import { LogisticsDialogScreen } from './screens/new-logistics-screens/logistics.screen';
import { CollectedData, CollectedDataSchema } from './common/schema/collected_data.schema';
import { Question, QuestionSchema } from './common/schema/question.schema';
import { QuestionCategory, QuestionCategorySchema } from './common/schema/question_category.schema';
import { QuestionService } from './common/schema/question/question.service';

dotenv.config();

@Module({
  imports: [
    AggregateModule,
    MongooseModule.forRoot(
      process.env.MONGODBPROD,
    ),
    MongooseModule.forFeature([
      { name: PermittedUser.name, schema: PermittedUserSchema },
      { name: Facility.name, schema: FacilitySchema },
      { name: DataEntryPermission.name, schema: DataEntryPermissionSchema },
      { name: CollectedData.name, schema: CollectedDataSchema },
      { name: Question.name, schema: QuestionSchema},
      { name: QuestionCategory.name, schema: QuestionCategorySchema}
    ]),
    SurveillanceModule,
    LogisticModule,
    VerifiedNumberModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticatePhoneNumberService, QuestionService,PermittedUserService, InitialScreen, LogisticsDialogScreen],
})
export class AppModule {}
