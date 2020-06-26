import * as _ from 'lodash';

let ussdInput = ['34','17','90','99','78','B'];

if(ussdInput.length >= 2){
    const indexes = [];
    ussdInput.forEach((value, index) => {
        if((index + 1) % 3 === 0){
            indexes.push(index);
        }
    });

    indexes.forEach(i => {
        if(ussdInput[i] !== 'B' && ussdInput[i] !== 'N' && ussdInput[i] !== 'E') {
            ussdInput.splice(i, 0, 'B');
        }
    });

    console.log(indexes);
}

console.log(ussdInput);