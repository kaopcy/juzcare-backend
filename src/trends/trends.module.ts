import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trend, TrendSchema } from './models/trend';
import { TrendsService } from './trends.service';

@Module({
  imports:
    [
      MongooseModule.forFeature([
        { name: Trend.name, schema: TrendSchema },
      ]),
    ],
  providers: [TrendsService]
})
export class TrendsModule {}
