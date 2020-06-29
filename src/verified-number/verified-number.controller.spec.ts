import { Test, TestingModule } from '@nestjs/testing';
import { VerifiedNumberController } from './verified-number.controller';

describe('VerifiedNumber Controller', () => {
  let controller: VerifiedNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifiedNumberController],
    }).compile();

    controller = module.get<VerifiedNumberController>(VerifiedNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
