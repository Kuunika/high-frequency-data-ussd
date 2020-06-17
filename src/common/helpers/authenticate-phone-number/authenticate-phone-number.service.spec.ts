import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticatePhoneNumberService } from './authenticate-phone-number.service';

describe('AuthenticatePhoneNumberService', () => {
  let service: AuthenticatePhoneNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticatePhoneNumberService],
    }).compile();

    service = module.get<AuthenticatePhoneNumberService>(AuthenticatePhoneNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
