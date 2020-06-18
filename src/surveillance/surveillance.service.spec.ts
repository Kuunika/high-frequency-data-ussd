import { Test, TestingModule } from '@nestjs/testing';
import { SurveillanceService } from './surveillance.service';

describe('SurveillanceService', () => {
  let service: SurveillanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveillanceService],
    }).compile();

    service = module.get<SurveillanceService>(SurveillanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
