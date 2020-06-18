import { Injectable } from "@nestjs/common";
import { UnboundedDialogScreen } from "src/core/unbounded-dialog-screen";
import { UssdHeader, ussdResponseMessage} from '../../common/helpers/ussd-utilities'


@Injectable()
export class StockOutScreen extends UnboundedDialogScreen {
    constructor() {
        super();
        this.postScreen = ussdResponseMessage(UssdHeader.END, 'Thank you');

        this.dialogScreenTexts = [
            ussdResponseMessage(UssdHeader.CON, '1. Is Stock Apron, Sleeved, Disposable Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '2. Is Coveralls Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '3. Is Gown, Protective, Disposable Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '4. Is Surgical Face Mask, 3-ply, Disposable Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '5. Is Shoe Cover, Disposable Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '6. Is Swab and Viral Transport Medium Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '7. Is Glove disposable powdered latex Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '8. Is Respirator (FFP3, FFP2, N95) Out Of Stock?\n1. Yes\n2.No'),
            ussdResponseMessage(UssdHeader.CON, '9. Enter Comment'),
        ];
    }
}