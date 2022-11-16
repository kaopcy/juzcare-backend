import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediasService } from './medias.service';
import { Media, MediaSchema } from './models/media';

@Module({
  imports:
  [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
  providers: [MediasService]
})
export class MediasModule {}
