import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregateModule } from './aggregate/aggregate.module';

@Module({
  imports: [AggregateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
