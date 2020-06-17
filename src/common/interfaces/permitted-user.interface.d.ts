import { IFacility } from './facility.interface';

export interface IPermittedUser {
    id: string;
    firstName: string; 
    lastName: string;
    phoneNumber: string; 
    facility: IFacility;
}