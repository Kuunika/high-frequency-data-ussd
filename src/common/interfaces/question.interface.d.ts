import { Types } from "mongoose";

export interface IQuestion {
    id: Types.ObjectId;
    question: string;
    questionNumber: number;
    questionCategoryId: Types.ObjectId;
    questionCategory: string;
    acceptedValueType: string;
    answer: string;
}