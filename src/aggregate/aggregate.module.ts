import { Module } from '@nestjs/common';
import { AggregateController } from './aggregate.controller';
import { AggregateService } from './aggregate.service';

@Module({
  controllers: [AggregateController],
  providers: [AggregateService]
})
export class AggregateModule {}
