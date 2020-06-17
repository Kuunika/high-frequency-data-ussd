import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {

  const PORT = process.env.PORT ?? 3000;
  const PROTOCOL = process.env.PROTOCOL ?? 'http';
  const HOST = process.env.HOST ?? '127.0.0.1';
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`${PROTOCOL}://${HOST}:${PORT}`);
  
}

bootstrap();
