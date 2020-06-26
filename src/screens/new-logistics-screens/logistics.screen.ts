import { BoundedDialogScreen } from '../../core/new-base-classes/bounded-dialog-screen.abstract';
import { UssdOption } from '../../common/types/ussd-option.type';
import { UssdRequest } from '../../common/interfaces/ussd-request.interface';
import {
  UssdHeader,
  genericUssdErrorMessage,
  ussdResponseMessage,
} from '../../common/helpers/ussd-utilities';
import { Injectable } from '@nestjs/common';
import { Question } from '../../common/interfaces/question.interface';

@Injectable()
export class LogisticsDialogScreen extends BoundedDialogScreen {
  createDialogOptions(): Map<string, UssdOption> {
    return new Map([
      ['initial', this.createInitialDialogScreen.bind(this)],
      ['invalid', this.createInvalidOptionSelectedDialogScreen.bind(this)],
      ['1', this.createInPharmacyStockReportDialogScreenOne.bind(this)],
      ['2', this.createPointOfCareStockReportOne.bind(this)],
      ['3', this.createFacilityWideStockOutReportOne.bind(this)]
    ]);
  }

  private createInitialDialogScreen(
    ussdRequest: UssdRequest,
  ): string | Promise<string> {
    return ussdResponseMessage(
      UssdHeader.CON,
      'Hello Banda, 1.Report Stock In Pharmacy\n2.Report Stock Point Of Care\n3.Report Faclity Wide Stock Out',
    );
  }

  private createInvalidOptionSelectedDialogScreen(
    ussdRequest: UssdRequest,
  ): string | Promise<string> {
    if (ussdRequest.ussdTextInput.length === 0) {
      return ussdResponseMessage(
        UssdHeader.CON,
        'Invalid Option Selected\nEnter 1 to return to the Home Screen',
      );
    }

    ussdRequest.ussdTextInput.shift();

    return this.display(ussdRequest);
  }

  private createInPharmacyStockReportDialogScreenOne(
    ussdRequest: UssdRequest,
  ): string | Promise<string> {
    const firstScreenOptions: Question[] = [
      {
        questionNumber: 1,
        question: 'Apron, Sleeved',
        answer: '',
        expectedValueType: '',
      },
      {
        questionNumber: 2,
        question: 'Hand for Coveralls',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 3,
        question: 'Gown, Protective',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 4,
        question: 'Surgical Face Mask',
        answer: '0',
        expectedValueType: '',
      },
    ];
    console.log(ussdRequest.ussdTextInput, 'phar screen 1');
    //initial call
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = firstScreenOptions
        .map(message => `Pharmacy\n${message.questionNumber + '.' + message.question}\n`)
        .join('');

      return ussdResponseMessage(
        UssdHeader.CON,
        `${options}\nN to go to the next page`,
      );
    }

    //Either this goes to page 2, the home screen or generates an error message.
    const userSelectedOption = ussdRequest.ussdTextInput.shift();
    if (userSelectedOption === 'N' || userSelectedOption === 'n') {
      return this.createInPharmacyStockReportDialogScreenTwo(ussdRequest);
    }

    //entry
    //TODO: Add check to ensure the option provided is an actual number

    const selectedQuestion = firstScreenOptions.find(
      options => options.questionNumber === Number.parseInt(userSelectedOption),
    );

    if (Number.isNaN(selectedQuestion)) {
      return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
    }

    if (selectedQuestion) {
      return this.answerGivenQuestion(
        ussdRequest,
        selectedQuestion,
        this.createInPharmacyStockReportDialogScreenOne.bind(this),
      );
    }

    return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
  }

  private createInPharmacyStockReportDialogScreenTwo(ussdRequest: UssdRequest) {
    const secondScreenOptions = [
      {
        questionNumber: 5,
        question: 'Shoe Cover',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 6,
        question: 'Swab and Viral Transport Medium',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 7,
        question: 'Glove latex',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 8,
        question: 'Respirator (FFP3, FFP2, N95)',
        answer: '0',
        expectedValueType: '',
      },

      {
        questionNumber: 9,
        question: 'Comment',
        answer: '0',
        expectedValueType: '',
      },
    ];
    console.log(ussdRequest.ussdTextInput);
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = secondScreenOptions
        .map(message => `Pharmacy\n${message.questionNumber + '. ' + message.question}\n`)
        .join('');

      return ussdResponseMessage(UssdHeader.CON, `${options}\nB to go Back`);
    }
    //Either this goes to page 2, the home screen or generates an error message.
    const userSelectedOption = ussdRequest.ussdTextInput.shift();
    if (userSelectedOption === 'B' || userSelectedOption === 'b') {
      return this.createInPharmacyStockReportDialogScreenOne(ussdRequest);
    }

    //entry
    //TODO: Add check to ensure the option provided is an actual number

    const selectedQuestion = secondScreenOptions.find(
      options => options.questionNumber === Number.parseInt(userSelectedOption),
    );

    if (Number.isNaN(selectedQuestion)) {
      return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
    }

    if (selectedQuestion) {
      return this.answerGivenQuestion(
        ussdRequest,
        selectedQuestion,
        this.createInPharmacyStockReportDialogScreenTwo.bind(this),
      );
    }

    return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
  }

  private answerGivenQuestion(
    ussdRequest: UssdRequest,
    question: Question,
    ussdOption: UssdOption,
  ): string | Promise<string> {
    console.log(ussdRequest.ussdTextInput);
    //initial
    if (ussdRequest.ussdTextInput.length === 0) {
      if (question.question === 'Comment') {
        return ussdResponseMessage(UssdHeader.CON, `Enter A Comment`);
      }
      return ussdResponseMessage(
        UssdHeader.CON,
        `Enter Stock for:\n${question.question}`,
      );
    }

    //entry
    if (ussdRequest.ussdTextInput.length === 1) {
      const userAnswer = ussdRequest.ussdTextInput.shift();
      //Does the thing
      return ussdOption(ussdRequest);
    }

    //skip
    if (ussdRequest.ussdTextInput.length > 1) {
      ussdRequest.ussdTextInput.shift();
      return ussdOption(ussdRequest);
    }
  }

  private createPointOfCareStockReportOne(
    ussdRequest: UssdRequest,
  ): string | Promise<string> {
    const firstScreenOptions: Question[] = [
      {
        questionNumber: 1,
        question: 'Apron, Sleeved',
        answer: '',
        expectedValueType: '',
      },
      {
        questionNumber: 2,
        question: 'Hand for Coveralls',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 3,
        question: 'Gown, Protective',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 4,
        question: 'Surgical Face Mask',
        answer: '0',
        expectedValueType: '',
      },
    ];

    //initial call
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = firstScreenOptions
        .map(message => `Point of Care\n${message.questionNumber + '.' + message.question}\n`)
        .join('');

      return ussdResponseMessage(
        UssdHeader.CON,
        `${options}\nN to go to the next page`,
      );
    }

    //Either this goes to page 2, the home screen or generates an error message.
    const userSelectedOption = ussdRequest.ussdTextInput.shift();
    if (userSelectedOption === 'N' || userSelectedOption === 'n') {
      return this.createPointOfCareStockReportTwo(ussdRequest);
    }

    //entry
    //TODO: Add check to ensure the option provided is an actual number

    const selectedQuestion = firstScreenOptions.find(
      options => options.questionNumber === Number.parseInt(userSelectedOption),
    );

    if (Number.isNaN(selectedQuestion)) {
      return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
    }

    if (selectedQuestion) {
      return this.answerGivenQuestion(
        ussdRequest,
        selectedQuestion,
        this.createPointOfCareStockReportOne.bind(this),
      );
    }

    return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
  }

  private createPointOfCareStockReportTwo(
    ussdRequest: UssdRequest,
  ): string | Promise<string> {
    const secondScreenOptions = [
      {
        questionNumber: 5,
        question: 'Shoe Cover',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 6,
        question: 'Swab and Viral Transport Medium',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 7,
        question: 'Glove latex',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 8,
        question: 'Respirator (FFP3, FFP2, N95)',
        answer: '0',
        expectedValueType: '',
      },

      {
        questionNumber: 9,
        question: 'Comment',
        answer: '0',
        expectedValueType: '',
      },
    ];
    console.log(ussdRequest.ussdTextInput);
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = secondScreenOptions
        .map(message => `Point Of Care\n${message.questionNumber + '. ' + message.question}\n`)
        .join('');

      return ussdResponseMessage(UssdHeader.CON, `${options}\nB to go Back`);
    }
    //Either this goes to page 2, the home screen or generates an error message.
    const userSelectedOption = ussdRequest.ussdTextInput.shift();
    if (userSelectedOption === 'B' || userSelectedOption === 'b') {
      return this.createPointOfCareStockReportOne(ussdRequest);
    }

    //entry
    //TODO: Add check to ensure the option provided is an actual number

    const selectedQuestion = secondScreenOptions.find(
      options => options.questionNumber === Number.parseInt(userSelectedOption),
    );

    if (Number.isNaN(selectedQuestion)) {
      return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
    }

    if (selectedQuestion) {
      return this.answerGivenQuestion(
        ussdRequest,
        selectedQuestion,
        this.createPointOfCareStockReportTwo.bind(this),
      );
    }

    return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
  }

  private createFacilityWideStockOutReportOne(ussdRequest: UssdRequest){
    const firstScreenOptions: Question[] = [
      {
        questionNumber: 1,
        question: 'Apron, Sleeved',
        answer: '',
        expectedValueType: '',
      },
      {
        questionNumber: 2,
        question: 'Hand for Coveralls',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 3,
        question: 'Gown, Protective',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 4,
        question: 'Surgical Face Mask',
        answer: '0',
        expectedValueType: '',
      },
    ];

    //initial call
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = firstScreenOptions
        .map(message => `Facility Wide\n${message.questionNumber + '.' + message.question}\n`)
        .join('');

      return ussdResponseMessage(
        UssdHeader.CON,
        `${options}\nN to go to the next page`,
      );
    }

    //Either this goes to page 2, the home screen or generates an error message.
    const userSelectedOption = ussdRequest.ussdTextInput.shift();
    if (userSelectedOption === 'N' || userSelectedOption === 'n') {
      return this.createFacilityWideStockOutReportTwo(ussdRequest);
    }

    //entry
    //TODO: Add check to ensure the option provided is an actual number

    const selectedQuestion = firstScreenOptions.find(
      options => options.questionNumber === Number.parseInt(userSelectedOption),
    );

    if (Number.isNaN(selectedQuestion)) {
      return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
    }

    if (selectedQuestion) {
      return this.answerGivenStockOutQuestion(
        ussdRequest,
        selectedQuestion,
        this.createFacilityWideStockOutReportOne.bind(this),
      );
    }

    return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
  }

  private createFacilityWideStockOutReportTwo(ussdRequest: UssdRequest){
    const secondScreenOptions = [
      {
        questionNumber: 5,
        question: 'Shoe Cover',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 6,
        question: 'Swab and Viral Transport Medium',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 7,
        question: 'Glove latex',
        answer: '0',
        expectedValueType: '',
      },
      {
        questionNumber: 8,
        question: 'Respirator (FFP3, FFP2, N95)',
        answer: '0',
        expectedValueType: '',
      },
    ];
    console.log(ussdRequest.ussdTextInput);
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = secondScreenOptions
        .map(message => `Facility Wide\n${message.questionNumber + '. ' + message.question}\n`)
        .join('');

      return ussdResponseMessage(UssdHeader.CON, `${options}\nB to go Back`);
    }
    //Either this goes to page 2, the home screen or generates an error message.
    const userSelectedOption = ussdRequest.ussdTextInput.shift();
    if (userSelectedOption === 'B' || userSelectedOption === 'b') {
      return this.createFacilityWideStockOutReportOne(ussdRequest);
    }

    //entry
    //TODO: Add check to ensure the option provided is an actual number

    const selectedQuestion = secondScreenOptions.find(
      options => options.questionNumber === Number.parseInt(userSelectedOption),
    );

    if (Number.isNaN(selectedQuestion)) {
      return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
    }

    if (selectedQuestion) {
      return this.answerGivenStockOutQuestion(
        ussdRequest,
        selectedQuestion,
        this.createFacilityWideStockOutReportTwo.bind(this),
      );
    }

    return this.createInvalidOptionSelectedDialogScreen(ussdRequest);
  }

  private answerGivenStockOutQuestion(ussdRequest: UssdRequest, question: Question, ussdOption: UssdOption){
    //initial
    if (ussdRequest.ussdTextInput.length === 0) {
      return ussdResponseMessage(
        UssdHeader.CON,
        `Have you confirmed that there is no stock of this product in the pharmacy?\nYes or No`,
      );
    }

    //entry
    if (ussdRequest.ussdTextInput.length === 1) {
      const userAnswer = ussdRequest.ussdTextInput.shift();
      //Does the thing
      return ussdResponseMessage(
        UssdHeader.CON,
        `Have you confirmed that there is no stock of this product at the points of care?\nYes or No`,
      );
    }

    if (ussdRequest.ussdTextInput.length === 2) {
      ussdRequest.ussdTextInput.shift()
      const userAnswer = ussdRequest.ussdTextInput.shift();
      //Does the thing
      return ussdOption(ussdRequest);
    }

    //skip
    if (ussdRequest.ussdTextInput.length > 2) {
      ussdRequest.ussdTextInput.shift();
      ussdRequest.ussdTextInput.shift();
      return ussdOption(ussdRequest);
    }
  }
}
