import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './models/report';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/models/user';
import { Media, MediaSchema } from 'src/medias/models/media';
import { MediasService } from 'src/medias/medias.service';
import { Comment, CommentSchema } from 'src/comments/models/comment';
import { CommentsService } from 'src/comments/comments.service';
import { Location, LocationSchema } from 'src/locations/models/location';
import { LocationsService } from 'src/locations/locations.service';
import { Tag, TagSchema } from 'src/tags/models/tag';
import { TagsService } from 'src/tags/tags.service';

@Module({
  imports:
  [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: User.name, schema: UserSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [ReportsService, ReportsResolver, UsersService, MediasService, CommentsService, LocationsService, TagsService]
})
export class ReportsModule {}
