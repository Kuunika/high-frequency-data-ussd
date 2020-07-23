import { BoundedDialogScreen } from '../../core/new-base-classes/bounded-dialog-screen.abstract';
import { UssdOption } from '../../common/types/ussd-option.type';
import { UssdRequest } from '../../common/interfaces/ussd-request.interface';
import {
  UssdHeader,
  ussdResponseMessage,
} from '../../common/helpers/ussd-utilities';
import { Injectable } from '@nestjs/common';
import { IQuestion } from '../../common/interfaces/question.interface';
import { QuestionService } from '../../common/schema/question/question.service';

@Injectable()
export class LogisticsDialogScreen extends BoundedDialogScreen {


  constructor(private questionService: QuestionService) {
    super();
  }

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
      `Hello ${ussdRequest.permittedUser.firstName},\n1.Report Stock In Pharmacy\n2.Report Stock Point Of Care\n3.Report Facility Wide Stock Out`,
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

  private async createInPharmacyStockReportDialogScreenOne(
    ussdRequest: UssdRequest,
  ): Promise<string> {
    const firstScreenOptions: IQuestion[] = await this.questionService.getAllQuestionsFromCategory('Logistics: In Pharmacy', ussdRequest);
    //initial call
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = firstScreenOptions
        .filter(options => options.questionNumber <= 4)
        .sort((a,b) => a.questionNumber - b.questionNumber)
        .map(message => `${message.questionNumber + '.' + message.question + ':' + message.answer}\n`)
        .join('');

      return ussdResponseMessage(
        UssdHeader.CON,
        `Pharmacy\n${options}\nN to go to the next page`,
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

  private async createInPharmacyStockReportDialogScreenTwo(ussdRequest: UssdRequest) {
    const secondScreenOptions = await this.questionService.getAllQuestionsFromCategory('Logistics: In Pharmacy', ussdRequest);

    if (ussdRequest.ussdTextInput.length === 0) {
      const options = secondScreenOptions
        .filter(options => options.questionNumber > 4 && options.questionNumber <= 9)
        .sort((a,b) => a.questionNumber - b.questionNumber)
        .map(message => `${message.questionNumber + '. ' + message.question + ':' + message.answer}\n`)
        .join('');

      return ussdResponseMessage(UssdHeader.CON, `Pharmacy\n${options}\nB to go Back`);
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
    question: IQuestion,
    ussdOption: UssdOption,
  ): string | Promise<string> {
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
      this.questionService.enterUssdQuestionData(question,ussdRequest.permittedUser.facility,userAnswer, ussdRequest.dataEntryDate);
      return ussdOption(ussdRequest);
    }

    //skip
    if (ussdRequest.ussdTextInput.length > 1) {
      ussdRequest.ussdTextInput.shift();
      return ussdOption(ussdRequest);
    }
  }

  private async createPointOfCareStockReportOne(
    ussdRequest: UssdRequest,
  ): Promise<string> {
    const firstScreenOptions: IQuestion[] = await this.questionService.getAllQuestionsFromCategory('Logistics: Point of Care', ussdRequest);

    //initial call
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = firstScreenOptions
        .filter(options => options.questionNumber <= 4)
        .sort((a,b) => a.questionNumber - b.questionNumber)
        .map(message => `${message.questionNumber + '.' + message.question}\n`)
        .join('');

      return ussdResponseMessage(
        UssdHeader.CON,
        `Point of Care\n${options}\nN to go to the next page`,
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

  private async createPointOfCareStockReportTwo(
    ussdRequest: UssdRequest,
  ): Promise<string> {
    const secondScreenOptions = await this.questionService.getAllQuestionsFromCategory('Logistics: Point of Care', ussdRequest);

    if (ussdRequest.ussdTextInput.length === 0) {
      const options = secondScreenOptions
        .filter(options => options.questionNumber > 4 && options.questionNumber <= 9)
        .sort((a,b) => a.questionNumber - b.questionNumber)
        .map(message => `${message.questionNumber + '. ' + message.question}\n`)
        .join('');

      return ussdResponseMessage(UssdHeader.CON, `Point of Care\n${options}\nB to go Back`);
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

  private async createFacilityWideStockOutReportOne(ussdRequest: UssdRequest){
    const firstScreenOptions: IQuestion[] = await this.questionService.getAllQuestionsFromCategory('Logistics: Facility-Wide Stock Out', ussdRequest);

    //initial call
    if (ussdRequest.ussdTextInput.length === 0) {
      const options = firstScreenOptions
        .filter(options => options.questionNumber <= 4)
        .sort((a,b) => a.questionNumber - b.questionNumber)
        .map(message => `${message.questionNumber + '.' + message.question}\n`)
        .join('');

      return ussdResponseMessage(
        UssdHeader.CON,
        `Facility Wide\n${options}\nN to go to the next page`,
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

  private async createFacilityWideStockOutReportTwo(ussdRequest: UssdRequest){
    const secondScreenOptions = await this.questionService.getAllQuestionsFromCategory('Logistics: Facility-Wide Stock Out', ussdRequest);

    if (ussdRequest.ussdTextInput.length === 0) {
      const options = secondScreenOptions
        .filter(options => options.questionNumber > 4 && options.questionNumber <= 8)
        .sort((a,b) => a.questionNumber - b.questionNumber)
        .map(message => `${message.questionNumber + '. ' + message.question + ':' + message.answer}\n`)
        .join('');

      return ussdResponseMessage(UssdHeader.CON, `Facility Wide\n${options}\nB to go Back`);
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

  private answerGivenStockOutQuestion(ussdRequest: UssdRequest, question: IQuestion, ussdOption: UssdOption){
    //initial
    if (ussdRequest.ussdTextInput.length === 0) {
      return ussdResponseMessage(
        UssdHeader.CON,
        `Have you confirmed that there is no stock of this product in the pharmacy?\nYes or No`,
      );
    }

    //entry
    if (ussdRequest.ussdTextInput.length === 1) {
      //const userAnswer = ussdRequest.ussdTextInput.shift();
      //Does the thing
      return ussdResponseMessage(
        UssdHeader.CON,
        `Have you confirmed that there is no stock of this product at the points of care?\nYes or No`,
      );
    }

    if (ussdRequest.ussdTextInput.length === 2) {
      const userAnswerPharmacy = ussdRequest.ussdTextInput.shift()
      const userAnswerPointOfCare = ussdRequest.ussdTextInput.shift();
      //Does the thing
      this.questionService.enterUssdQuestionData(question, ussdRequest.permittedUser.facility, `Confirm at pharmacy ${userAnswerPharmacy} - Confirmed at point of care ${userAnswerPointOfCare}`, ussdRequest.dataEntryDate);
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
