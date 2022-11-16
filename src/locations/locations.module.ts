import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsResolver } from './locations.resolver';
import { LocationsService } from './locations.service';
import { Location, LocationSchema } from './models/location';

@Module({
  imports:
  [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
  ],
  providers: [LocationsService, LocationsResolver]
})
export class LocationsModule {}
