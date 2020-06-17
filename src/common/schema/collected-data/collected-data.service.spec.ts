import { Test, TestingModule } from '@nestjs/testing';
import { CollectedDataService } from './collected-data.service';

describe('CollectedDataService', () => {
  let service: CollectedDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectedDataService],
    }).compile();

    service = module.get<CollectedDataService>(CollectedDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
