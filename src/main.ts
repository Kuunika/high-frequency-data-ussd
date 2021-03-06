import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {

  const PORT = process.env.PORT ?? 3333;
  const PROTOCOL = process.env.PROTOCOL ?? 'http';
  const HOST = process.env.HOST ?? '127.0.0.1';
  const app = await NestFactory.create(AppModule);

  const apiVersion = process.env.API_VERSION;

  const PREFIX = `/hfd/api/${apiVersion}`;

  app.setGlobalPrefix(PREFIX);

  await app.listen(PORT);
  console.log(`${PROTOCOL}://${HOST}:${PORT}${PREFIX}`);
  
}

bootstrap();
