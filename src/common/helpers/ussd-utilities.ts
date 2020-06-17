export enum UssdHeader {
    END = 'END',
    CON = 'CON'
}

export function parseTextFromUssd(ussdText = ''): string[] {
    const parsedTextFromUSSD = ussdText.split('*');
    return parsedTextFromUSSD.length === 1 && parsedTextFromUSSD[0] === '' ? new Array(0) : parsedTextFromUSSD;
}

function truncateUssdResponseToMaxMessageLength(ussdResponseText: string) {
    if (ussdResponseText.length <= 182) {
      return ussdResponseText
    }
    return ussdResponseText.slice(0, 182)
}

export function ussdResponseMessage(ussdHeader: UssdHeader, message: string): string {
    return `${ussdHeader} ${truncateUssdResponseToMaxMessageLength(message)}`;
}

export function genericUssdErrorMessage(): string {
    return ussdResponseMessage(UssdHeader.END, 'An Error Has Occurred');
};

export function validUssdTextArray(ussdTextArray: string[]): boolean {

    const ussdTextArrayContainsEmptyString = ussdTextArray.some((ussdText) => ussdText.trim() === '');
    
    if (ussdTextArrayContainsEmptyString) return false;

    return true;
}