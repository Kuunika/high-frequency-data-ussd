import { Test, TestingModule } from '@nestjs/testing';
import { QuestionCategoryService } from './question-category.service';

describe('QuestionCategoryService', () => {
  let service: QuestionCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionCategoryService],
    }).compile();

    service = module.get<QuestionCategoryService>(QuestionCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
