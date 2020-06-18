import { BaseDialogScreen } from "./base-dialog-screen";

export abstract class UnboundedDialogScreen extends BaseDialogScreen {
    dialogScreenTexts = [];
    answers = [];
    
    postScreen = '';

    setPostScreen(): void | Promise<void> {}
    setDialogScreenTexts(): void | Promise<void> {}

    display(ussdTextInput?: string[]){
        console.log(ussdTextInput);
        
        // Returns error message string if dialogScreenText is eq to null

        return this.enterDialogScreenText(ussdTextInput);
        
    }

    // Very tricky the more dynamic it gets
    enterDialogScreenText(ussdTextInput: string[]): string{
        //if ussdTextInput is empty return first question
        if(ussdTextInput === undefined || ussdTextInput.length === 0) return this.dialogScreenTexts[0];

        const currentQuestionIndex = ussdTextInput.length - 1;

        //check question accepted value

        //parses passed value to corresponding question value

        //if it doesn't correspond throw failure* work on more graceful approach.

        //save result to database
        // TODO: need to add all of the correct answers in the array on each request
        this.answers = [];
        this.answers.push(...ussdTextInput);
        console.log(this.answers);

        if(this.answers.length >= this.dialogScreenTexts.length) return this.displayPostScreen();

        //return next question
        return this.dialogScreenTexts[currentQuestionIndex + 1];
    }

    displayPostScreen(): string {
        //TODO: Warning this will include all of the answer including those who have gone over all answers
        this.setPostScreen();
        // TODO: Throw exception when post screen is not set.
        console.log(this.postScreen);
        return this.postScreen;
    }

}