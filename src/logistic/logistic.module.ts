import { Module } from '@nestjs/common';
import { LogisticController } from './logistic.controller';
import { LogisticService } from './logistic.service';
import { InitialDialogScreen } from 'src/screens/logistic-screens/initial-dialog.screen';
import { StockReportScreen } from 'src/screens/logistic-screens/stock-report.screen';
import { StockOutScreen } from 'src/screens/logistic-screens/stock-out.screen';

@Module({
  controllers: [LogisticController],
  providers: [LogisticService]
})
export class LogisticModule {}
