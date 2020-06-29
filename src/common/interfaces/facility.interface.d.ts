import { Types } from "mongoose";

export interface IFacility {
    id: Types.ObjectId;
    facilityCode: string;
    facilityName: string;
}