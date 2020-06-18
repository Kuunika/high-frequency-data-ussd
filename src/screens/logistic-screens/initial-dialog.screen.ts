import { BoundedDialogScreen } from 'src/core/bounded-dialog-screen';
import { Injectable } from '@nestjs/common';
import { UssdHeader, ussdResponseMessage} from '../../common/helpers/ussd-utilities'
import { StockReportScreen } from './stock-report.screen';
import { StockOutScreen } from './stock-out.screen';


@Injectable()
export class InitialDialogScreen extends BoundedDialogScreen {

  constructor(private readonly stockReportScreen: StockReportScreen, private readonly stockOutScreen: StockOutScreen) {
    super();
  }

  setScreenOptionText() {
    this.screenOptionsText =
      ussdResponseMessage(UssdHeader.CON, 'Hello John of Kamuzu Central\n1. Enter Stock Report \n2. Enter Report Stock Out');
  }

  setSelectableOption() {
    //TODO: the javascript "this" keyword strikes again, find a fix for the function;
    const stockReport = this.stockReportScreen;
    const stockOutScreen = this.stockOutScreen;

    this.selectableOptions = {
      '1': function(ussdTextInput?: string[]) {
        return stockReport.display(ussdTextInput);
      },
      '2': function(ussdTextInput?: string[]) {
        return stockOutScreen.display(ussdTextInput);
      },
    };
  }

}
