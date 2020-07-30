import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArchivesService } from '../src/archives/archives.service';
import { ArchivesModule } from '../src/archives/archives.module';

describe('ArchivesController (e2e)', () => {
  let app: INestApplication;

  const service = {
    archive: (format: string): Promise<{} | null> => {
      if (!['csv', 'json'].includes(format)) return Promise.resolve(null);
      if (format === 'json') return Promise.resolve({ name: 'Daniel' });
      return Promise.resolve('name\nDaniel\n');
    }
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ArchivesModule
      ],
    })
      .overrideProvider(ArchivesService)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET json archives`, async () => {
    return request(app.getHttpServer())
      .get('/archives?format=json')
      .expect(200)
      .expect(await service.archive('json'));
  });

  it(`/GET csv archives`, async () => {
    return request(app.getHttpServer())
      .get('/archives?format=csv')
      .expect(200)
      .expect(await service.archive('csv'));
  });

  it('/GET an archive without a format to be flagged as 400', () => {
    return request(app.getHttpServer())
      .get('/archives')
      .expect(400);
  });

  it('/GET an archive with unsupported format to be flagged as 400', () => {
    return request(app.getHttpServer())
      .get('/archives?format=text')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});