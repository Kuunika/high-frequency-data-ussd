const ussdString = [];

const screenOptions1 = [
    {
        optionNumber: '1',
        option: 'Burgers',
    },
    {
        optionNumber: '2',
        option:'Rice',
    },
    {
        optionNumber: '3',
        option: 'Coffee',
    },
    {
        optionNumber: '4',
        option: 'Pizza',
    }
]

const screenText1 = `Enter Information for: ${screenOptions1.map(option => option.optionNumber + '.' + option.option).join('')}`;


function createNavigationScreen(ussdString: string[]){
    
    if(ussdString.length === 0) {
        return '';
    }

    const selectedOptionNumber = ussdString.shift();
    
    const selectedOption = screenOptions1.find(option => option.optionNumber === selectedOptionNumber);

    if(selectedOption) return createDataEntryScreen(ussdString, selectedOption);
    return '';
    
}

function createDataEntryScreen(ussdString: string[], selectedOption){
    
    if(ussdString.length === 0){
        console.log(`Please Enter a value for ${selectedOption.option}`);
        return '';
    } 
    
    const enteredValue = ussdString.shift();
    
    if(ussdString.length === 0) console.log(`You Entered ${enteredValue} for ${selectedOption.option}`);
    
    return createNavigationScreen(ussdString);
}

createNavigationScreen(['1','3','N']);