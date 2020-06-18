import { Injectable } from "@nestjs/common";
import { UnboundedDialogScreen } from "src/core/unbounded-dialog-screen";
import { UssdHeader, ussdResponseMessage} from '../../common/helpers/ussd-utilities'


@Injectable()
export class StockReportScreen extends UnboundedDialogScreen {
    constructor() {
        super();
        this.postScreen = ussdResponseMessage(UssdHeader.END, 'Thank you');

        this.dialogScreenTexts = [
            ussdResponseMessage(UssdHeader.CON, '1. Enter Stock on Hand for Apron, Sleeved, Disposable'),
            ussdResponseMessage(UssdHeader.CON, '2. Enter Stock on Hand for Coveralls'),
            ussdResponseMessage(UssdHeader.CON, '3. Enter Stock on Hand for Gown, Protective, Disposable'),
            ussdResponseMessage(UssdHeader.CON, '4. Enter Stock on Hand for Surgical Face Mask, 3-ply, Disposable'),
            ussdResponseMessage(UssdHeader.CON, '5. Enter Stock on Hand for Shoe Cover, Disposable'),
            ussdResponseMessage(UssdHeader.CON, '6. Enter Stock on Hand for Swab and Viral Transport Medium'),
            ussdResponseMessage(UssdHeader.CON, '7. Enter Stock on Hand for Glove disposable powdered latex'),
            ussdResponseMessage(UssdHeader.CON, '8. Enter Stock on Hand for Respirator (FFP3, FFP2, N95)'),
            ussdResponseMessage(UssdHeader.CON, '9. Enter Comment'),
        ];
    }
}