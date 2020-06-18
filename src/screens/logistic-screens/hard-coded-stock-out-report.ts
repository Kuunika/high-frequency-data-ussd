import * as _ from 'lodash';
import { UssdHeader, ussdResponseMessage} from '../../common/helpers/ussd-utilities';

export class HardCodedStockOutReport {
    firstScreenOptions = [
        {
            optionNumber: '1',
            option: 'Apron, Sleeved',
            qty: '0',
            comment: ''
        },
        {
            optionNumber: '2',
            option: 'Hand for Coveralls',
            qty: '0',
            comment: ''
        },
        {
            optionNumber: '3',
            option: 'Gown, Protective',
            qty: '0',
            comment: ''
        },
        {
            optionNumber: '4',
            option: 'Surgical Face Mask',
            qty: '0',
            comment: ''
        }
    ];
    secondScreenOptions = [
        {
            optionNumber: '5',
            option: 'Shoe Cover',
            qty: '0',
            comment: ''
        },
        {
            optionNumber: '6',
            option: 'Swab and Viral Transport Medium',
            qty: '0',
            comment: ''
        },
        {
            optionNumber: '7',
            option: 'Glove latex',
            qty: '0',
            comment: ''
        },
        {
            optionNumber: '8',
            option: 'Respirator (FFP3, FFP2, N95)',
            qty: '0',
            comment: ''
        },

        {
            optionNumber: '9',
            option: 'Comment',
            qty: '0',
            comment: ''
        },
    ];

    first = this.firstScreenOptions.map(message => `${message.optionNumber + '.' + message.option}\n`).join('');
    second = this.secondScreenOptions.map(message => `${message.optionNumber + '.' + message.option}\n`).join('');

    firstScreenMessage = ussdResponseMessage(UssdHeader.CON, `Enter Stock Out For:\n${this.first}N for Next or E for Exit`);
    secondScreenMessage = ussdResponseMessage(UssdHeader.CON, `Enter Stock Out For:\n${this.second}B for Back or E for Exit`);

    display(ussdTextInput: string[]) {
        
        return this.createScreen(ussdTextInput);

    }

    truncateUssdStringsBasedOnB(ussd: string []){
        const indexes =[] 
        ussd.forEach((val, i) => {if(val === 'B') indexes.push(i)});
        return ussd.slice(_.last(indexes) + 1)
    
    }

    createScreen(ussdText: string[]){
        console.log(ussdText);
        const ussdTextInput = this.truncateUssdStringsBasedOnB(ussdText);
        console.log(ussdTextInput);

        if(ussdTextInput.length === 0) return this.firstScreenMessage;

        const currentInput = _.last(ussdTextInput);

        if(currentInput === 'E' || currentInput === 'e') return ussdResponseMessage(UssdHeader.END, 'Thank You');

        if(currentInput === 'N' || currentInput === 'n') return this.secondScreenMessage;

        if(currentInput === "B") return this.firstScreenMessage;

        const allOptions = [...this.firstScreenOptions,...this.secondScreenOptions];

        if(ussdTextInput.length >= 2 && _.nth(ussdTextInput, -1) !== 'B' && _.nth(ussdTextInput, -1) !== 'N' && _.nth(ussdTextInput, -2) !== 'B' && _.nth(ussdTextInput, -2) !== 'N'){
            console.log('Value Saved');
            //ussdTextInput.push("B");

            const optionNumber = _.nth(ussdTextInput,-1);

            const chunks = _.chunk(ussdTextInput,2);

            const newUssd = chunks.map((chunk,index, array) => {
                //console.log(chunk);
                if(chunk.length === 2 && !_.includes(chunk,'B')) {
                    chunk.push('B');
                    return chunk
                }
                return chunk
            });

            const items = _.flatten(newUssd);

            return this.createScreen(items);
        }

        const constExistingOption =  allOptions.find(i => i.optionNumber === currentInput);

        if(constExistingOption !== undefined) return ussdResponseMessage(UssdHeader.CON, currentInput !== '9' ? `Is Stock Out For:\n${constExistingOption.option}\n1. For Yes\n2. For No` : `Please Enter a Comment`);

        return ussdResponseMessage(UssdHeader.END, 'In Valid Option');
    }

}