import { Injectable, Logger, Inject } from '@nestjs/common';
import { PermittedUserService } from 'src/common/schema/permitted-user/permitted-user.service';
import { UnauthorizedPhoneNumberException } from 'src/common/exceptions/unauthorized-phone-number.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthenticatePhoneNumberService {

    constructor(private permittedUserService: PermittedUserService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    async authenticatePhoneNumber(phoneNumber: string, isInitialCheck = true){
        
        const formattedPhoneNumber = phoneNumber.includes('+') ? phoneNumber: `+${phoneNumber}`;
        const permittedUser = await this.permittedUserService.getPermittedUserByPhoneNumber(formattedPhoneNumber);
        
        if(permittedUser === null){
            !isInitialCheck && this.logger.warn(`WARNING: ${Date()}: UNAUTHORIZED request made from phone number: ${phoneNumber}`);
            throw new UnauthorizedPhoneNumberException(formattedPhoneNumber);
        } 
    
        return permittedUser;
    }
}
