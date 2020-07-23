import { IPermittedUser } from "./permitted-user.interface";

export interface UssdRequest {
    permittedUser: IPermittedUser,
    ussdTextInput: string[];
    dataEntryDate: Date;
}
