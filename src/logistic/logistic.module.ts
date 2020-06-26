import { Module } from '@nestjs/common';
import { LogisticController } from './logistic.controller';
import { LogisticService } from './logistic.service';
import { LogisticsDialogScreen } from '../screens/new-logistics-screens/logistics.screen';
import { QuestionService } from '../common/schema/question/question.service';

@Module({
  controllers: [LogisticController],
  providers: [LogisticService, LogisticsDialogScreen, QuestionService]
})
export class LogisticModule {}
