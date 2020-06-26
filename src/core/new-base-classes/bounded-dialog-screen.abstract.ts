import { UssdRequest } from '../../common/interfaces/ussd-request.interface';
import { UssdOption } from '../../common/types/ussd-option.type';

export abstract class BoundedDialogScreen {
  abstract createDialogOptions(): Map<string, UssdOption>;

  display(ussdRequest: UssdRequest) {
    const dialogOptions = this.createDialogOptions();

    if (dialogOptions.has('initial') === false) {
      throw new Error('The Initial Dialog Screen Was Not Defined');
    }

    if (dialogOptions.has('invalid') === false) {
      throw new Error('The Invalid Dialog Screen Was Not Defined');
    }

    if (
      ussdRequest.ussdTextInput === undefined ||
      ussdRequest.ussdTextInput.length === 0
    ) {
      return dialogOptions.get('initial')(ussdRequest);
    }

    const userSelectedOption = ussdRequest.ussdTextInput.shift();

    if (userSelectedOption === 'initial' || userSelectedOption === '') {
      return dialogOptions.get('invalid')(ussdRequest);
    }

    if (dialogOptions.has(userSelectedOption)) {
      return dialogOptions.get(userSelectedOption)(ussdRequest);
    }

    return dialogOptions.get('invalid')(ussdRequest);
  }
}
