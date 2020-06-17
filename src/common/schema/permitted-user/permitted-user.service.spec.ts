import { Test, TestingModule } from '@nestjs/testing';
import { PermittedUserService } from './permitted-user.service';

describe('PermittedUserService', () => {
  let service: PermittedUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermittedUserService],
    }).compile();

    service = module.get<PermittedUserService>(PermittedUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
