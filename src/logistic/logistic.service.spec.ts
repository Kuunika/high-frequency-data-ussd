import { Test, TestingModule } from '@nestjs/testing';
import { LogisticService } from './logistic.service';

describe('LogisticService', () => {
  let service: LogisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogisticService],
    }).compile();

    service = module.get<LogisticService>(LogisticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
