import { Module } from '@nestjs/common';
import { VerifiedNumberController } from './verified-number.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PermittedUser,
  PermittedUserSchema,
} from 'src/common/schema/permitted_user.schema';
import { PermittedUserService } from 'src/common/schema/permitted-user/permitted-user.service';
import { Facility, FacilitySchema } from 'src/common/schema/facility.schema';
import {
  DataEntryPermission,
  DataEntryPermissionSchema,
} from 'src/common/schema/data-entry-permission.schema';
import { AuthenticatePhoneNumberService } from 'src/common/helpers/authenticate-phone-number/authenticate-phone-number.service';

@Module({
  imports: [
    
    MongooseModule.forFeature([
      { name: PermittedUser.name, schema: PermittedUserSchema },
      { name: Facility.name, schema: FacilitySchema },
      { name: DataEntryPermission.name, schema: DataEntryPermissionSchema },
    ]),
  ],
  controllers: [VerifiedNumberController],
  providers: [AuthenticatePhoneNumberService, PermittedUserService],
})
export class VerifiedNumberModule {}
