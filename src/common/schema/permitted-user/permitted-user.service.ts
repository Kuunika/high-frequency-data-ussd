import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PermittedUser } from '../permitted_user.schema';
import { Model } from 'mongoose';
import { IPermittedUser  } from "../../interfaces/permitted-user.interface";
import { Facility } from '../facility.schema';
import { DataEntryPermission } from '../data-entry-permission.schema';

@Injectable()
export class PermittedUserService {
    
    constructor(@InjectModel(PermittedUser.name) private permittedUserModel: Model<PermittedUser>,
                @InjectModel(Facility.name) private facilityModel: Model<Facility>,
                @InjectModel(DataEntryPermission.name) private dataEntryPermissionModel: Model<DataEntryPermission>) {}

    async getPermittedUserByPhoneNumber(phonenumber: string): Promise<IPermittedUser>{
        const permittedUser = await this.permittedUserModel.findOne({phonenumber}).exec();

        if(!permittedUser) return null;

        const facility = await this.facilityModel.findById(permittedUser.facility).exec();
        
        if(!facility) return null;

        const dataEntryPermission = await this.dataEntryPermissionModel.find().where('_id').in(permittedUser.data_entry_permissions);

        return {
            facility: {
                id: permittedUser.facility,
                facilityCode: facility.facility_code,
                facilityName: facility.facility_name,
            },
            firstName: permittedUser.first_name,
            lastName: permittedUser.last_name,
            id: permittedUser._id,
            phoneNumber: permittedUser.phonenumber,
            dataEntryPermissions: dataEntryPermission.map(permission => permission.permission),
        };
    }
}
