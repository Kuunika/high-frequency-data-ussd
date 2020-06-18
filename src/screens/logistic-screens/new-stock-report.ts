import { Injectable } from '@nestjs/common';
import { BoundedDialogScreen } from 'src/core/bounded-dialog-screen';
import { UssdHeader, ussdResponseMessage} from '../../common/helpers/ussd-utilities'

@Injectable()
export class StockReportScreen extends BoundedDialogScreen {

    dialogOptionsObjects = [
        {
            option: '1. Apron, Sleeved',
            qty: '0',
            comment: ''
        },
        {
            option: '2. Hand for Coveralls',
            qty: '0',
            comment: ''
        },
        {
            option: '3. Gown, Protective',
            qty: '0',
            comment: ''
        },
        {
            option: '4. Surgical Face Mask',
            qty: '0',
            comment: ''
        },
        {
            option: '5. Shoe Cover',
            qty: '0',
            comment: ''
        },
        {
            option: '6. Swab and Viral Transport Medium',
            qty: '0',
            comment: ''
        },
        {
            option: '7. Glove latex',
            qty: '0',
            comment: ''
        },
        {
            option: '8. Respirator (FFP3, FFP2, N95)',
            qty: '0',
            comment: ''
        },
    ];

    setScreenOptionText() {
        const options = this.dialogOptionsObjects.map(dialogOption => dialogOption.option + ':' + dialogOption.qty);
        this.screenOptionsText = ussdResponseMessage(UssdHeader.CON, 
            `Enter Stock for\n${options}`);

    }

    createSetOfSelectableOptions() {
        //Create Object with the same number of props as the number of property above

        
    }

    updateQuantity(optionName, ussdTextInput){

    }

    addComment(){

    }



}