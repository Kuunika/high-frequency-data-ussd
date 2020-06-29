import { Injectable } from '@nestjs/common';
import { PermittedUserService } from 'src/common/schema/permitted-user/permitted-user.service';
import { UnauthorizedPhoneNumberException } from 'src/common/exceptions/unauthorized-phone-number.exception';

@Injectable()
export class AuthenticatePhoneNumberService {

    constructor(private permittedUserService: PermittedUserService) {}

    async authenticatePhoneNumber(phoneNumber: string){
        
        const formattedPhoneNumber = phoneNumber.includes('+') ? phoneNumber: `+${phoneNumber}`;
        const permittedUser = await this.permittedUserService.getPermittedUserByPhoneNumber(formattedPhoneNumber);
        
        //if(permittedUser === null) throw new UnauthorizedPhoneNumberException(formattedPhoneNumber);
        
        return permittedUser;
    }
}
