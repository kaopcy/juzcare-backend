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
import { Progress, ProgressSchema } from 'src/progresses/models/progress';
import { ProgressesService } from 'src/progresses/progresses.service';
import { Admin, AdminSchema } from 'src/admins/models/admin';
import { AdminsService } from 'src/admins/admins.service';
import { StatusResolver } from './status.resolver';
import { ReviewResolver } from './review.resolver';
import { NotificationService } from 'src/notification/notification.service';
import { Notification, NotificationSchema } from 'src/notification/models/notifications';
import { Trend, TrendSchema } from 'src/trends/models/trend';
import { TrendsService } from 'src/trends/trends.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CreateReportFacade } from './report-facade/create-report.facade';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: User.name, schema: UserSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Tag.name, schema: TagSchema },
      { name: Progress.name, schema: ProgressSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Trend.name, schema: TrendSchema },
    ]),
  ],
  providers: [
    ReportsService,
    ReportsResolver,
    UsersService,
    MediasService,
    CommentsService,
    LocationsService,
    TagsService,
    ProgressesService,
    AdminsService,
    StatusResolver,
    ReviewResolver,
    NotificationService,
    TrendsService,
    CreateReportFacade
  ],
})
export class ReportsModule { }
