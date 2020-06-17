import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PermittedUser } from '../permitted_user.schema';
import { Model } from 'mongoose';
import { IPermittedUser  } from "../../interfaces/permitted-user.interface";
import { Facility } from '../facility.schema';

@Injectable()
export class PermittedUserService {
    
    constructor(@InjectModel(PermittedUser.name) private permittedUserModel: Model<PermittedUser>,
                @InjectModel(Facility.name) private facilityModel: Model<Facility> ) {}

    async getPermittedUserByPhoneNumber(phonenumber: string): Promise<IPermittedUser>{
        const permittedUser = await this.permittedUserModel.findOne({phonenumber}).exec();

        if(!permittedUser) return null;

        const facility = await this.facilityModel.findById(permittedUser.facility).exec();
        if(!facility) return null;

        return {
            facility: {
                facilityCode: facility.facility_code,
                facilityName: facility.facility_name,
            },
            firstName: permittedUser.first_name,
            lastName: permittedUser.last_name,
            id: permittedUser._id,
            phoneNumber: permittedUser.phonenumber,
        };
    }
}
