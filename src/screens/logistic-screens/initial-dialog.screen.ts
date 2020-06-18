import { BoundedDialogScreen } from 'src/core/bounded-dialog-screen';
import { Injectable } from '@nestjs/common';
import { UssdHeader, ussdResponseMessage} from '../../common/helpers/ussd-utilities'
import { StockReportScreen } from './stock-report.screen';
import { StockOutScreen } from './stock-out.screen';
import { HardCodedStockReport } from './hard-coded-stock-report';
import { HardCodedStockOutReport } from './hard-coded-stock-out-report';

export class InitialDialogScreen extends BoundedDialogScreen {

  constructor() {
    super();
  }

  setScreenOptionText() {
    this.screenOptionsText =
      ussdResponseMessage(UssdHeader.CON, 'Hello John of Kamuzu Central\n1. Stock Report \n2. Report Stock Out');
  }

  setSelectableOption() {
    //TODO: the javascript "this" keyword strikes again, find a fix for the function;
    const hardCodedStockReport = new HardCodedStockReport();
    const hardCodedStockOutReport = new HardCodedStockOutReport();

    this.selectableOptions = {
      '1': function(ussdTextInput?: string[]) {
        return hardCodedStockReport.display(ussdTextInput);
      },
      '2': function(ussdTextInput?: string[]) {
        return hardCodedStockOutReport.display(ussdTextInput);
      },
    };
  }

}
