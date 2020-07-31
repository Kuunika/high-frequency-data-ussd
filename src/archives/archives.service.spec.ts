import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CollectedData } from '../common/schema/collected_data.schema';
import { ArchivesService } from './archives.service';

describe('ArchivesService', () => {
  let service: ArchivesService;

  const data = [
    { name: 'Daniel', age: 22, sex: 'Male' },
    { name: 'Dan', age: 23, sex: 'Male' }
  ];

  const collectedDataModel = {
    find: () => ({ exec: () => Promise.resolve(data) })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArchivesService,
        {
          provide: getModelToken(CollectedData.name),
          useValue: collectedDataModel,
        }
      ],
    }).compile();

    service = module.get<ArchivesService>(ArchivesService);
  });

  it('should be able to fetch a json dump', async () => {
    const response = await service.archive('json');
    expect(response).toEqual(data);
  });

  it('should be able to fetch a csv dump', async () => {
    const response = await service.archive('csv');
    expect(response).toEqual("name,age,sex\r\nDaniel,22,Male\r\nDan,23,Male\r\n");
  });
});
