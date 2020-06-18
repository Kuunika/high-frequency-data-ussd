import { Test, TestingModule } from '@nestjs/testing';
import { LogisticController } from './logistic.controller';

describe('Logistic Controller', () => {
  let controller: LogisticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticController],
    }).compile();

    controller = module.get<LogisticController>(LogisticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
