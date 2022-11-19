import { Module } from '@nestjs/common';
import { ProgressesService } from './progresses.service';
import { ProgressesResolver } from './progresses.resolver';
import { UsersService } from 'src/users/users.service';
import { Progress, ProgressSchema } from './models/progress';
import { User, UserSchema } from 'src/users/models/user';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from 'src/medias/models/media';
import { MediasService } from 'src/medias/medias.service';

@Module({
  imports:
  [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: User.name, schema: UserSchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  providers: [ProgressesService, ProgressesResolver, UsersService, MediasService]
})
export class ProgressesModule {}
