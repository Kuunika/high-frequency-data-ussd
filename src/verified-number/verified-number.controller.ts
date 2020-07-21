import { Controller, Get, Param } from '@nestjs/common';
import { PermittedUserService } from 'src/common/schema/permitted-user/permitted-user.service';
import { AuthenticatePhoneNumberService } from 'src/common/helpers/authenticate-phone-number/authenticate-phone-number.service';

@Controller('authnumber')
export class VerifiedNumberController {

    constructor(private authenticatePhoneNumberService: AuthenticatePhoneNumberService) {}

    @Get(':phoneNumber')
    async validateNumber(@Param('phoneNumber') phoneNumber: string): Promise<{access: boolean}>{
        
        try {
            const user = await this.authenticatePhoneNumberService.authenticatePhoneNumber(phoneNumber);
            if(user !== null) return {access: true};

        } catch (error) {
            return {
                access: false
            }

        }
        
    }
}
