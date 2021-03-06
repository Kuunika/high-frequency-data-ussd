import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('VerifyNumberController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/authnumber/{phone number} (GET)', () => {
    return request(app.getHttpServer())
      .get('/authnumber/+265')
      .expect(200)
      .expect({access: true});
  });

  it('/authnumber/{phone number} (GET)', () => {
    return request(app.getHttpServer())
      .get('/authnumber/+265')
      .expect(200)
      .expect({access: false});
  });
});
