import { BaseDialogScreen } from "./base-dialog-screen";

export abstract class BoundedDialogScreen extends BaseDialogScreen {

    screenOptionsText = '';
    selectableOptions = {}

    setSelectableOption(): void | Promise<void> {}
    setScreenOptionText(): void | Promise<void> {}

    display(ussdTextInput?: string[]): string{
        
        this.setSelectableOption();
        this.setScreenOptionText();

        //TODO: Find Better Logic to see if an object is empty
        if(this.screenOptionsText === '') console.log('Dialog Screen Properties Undefined');

        if(ussdTextInput === undefined || ussdTextInput.length === 0) return this.screenOptionsText;

        if (ussdTextInput) return this.selectScreenOptions(ussdTextInput);

        return 'error'
        
    }

    displayScreenOptionsPrompt(): string {
        return '';
    }

    selectScreenOptions(ussdTextInput: string[]): string{
        const selectedOption = ussdTextInput.shift();

        if(selectedOption in this.selectableOptions) return this.selectableOptions[selectedOption](ussdTextInput);
    
        return 'End Error';
    }

}