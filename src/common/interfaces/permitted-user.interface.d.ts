import { IFacility } from './facility.interface';
import { DataEntryPermission } from './data-entry-permission.interface';

export interface IPermittedUser {
    id: string;
    firstName: string; 
    lastName: string;
    phoneNumber: string; 
    facility: IFacility;
    dataEntryPermissions: string[];
}