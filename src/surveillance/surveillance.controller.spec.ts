import { Test, TestingModule } from '@nestjs/testing';
import { SurveillanceController } from './surveillance.controller';

describe('Surveillance Controller', () => {
  let controller: SurveillanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveillanceController],
    }).compile();

    controller = module.get<SurveillanceController>(SurveillanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
