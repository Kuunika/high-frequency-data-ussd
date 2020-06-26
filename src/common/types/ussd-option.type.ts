import { UssdRequest } from "../interfaces/ussd-request.interface";
import { Question } from "../schema/question.schema";

export type UssdOption = (ussdRequest: UssdRequest, question?: Question) => Promise<string> | string;
