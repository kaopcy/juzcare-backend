import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { CommentsModule } from './comments/comments.module';
import { ReportsModule } from './reports/reports.module';
import { MediasModule } from './medias/medias.module';
import { LocationsModule } from './locations/locations.module';
import { TagsModule } from './tags/tags.module';
import { ProgressesModule } from './progresses/progresses.module';
import { AvatarsModule } from './avatars/avatars.module';
import { NotificationModule } from './notification/notification.module';
import { TrendsModule } from './trends/trends.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UsersModule,
    AuthModule,
    AdminsModule,
    CommentsModule,
    ReportsModule,
    MediasModule,
    LocationsModule,
    TagsModule,
    ProgressesModule,
    AvatarsModule,
    NotificationModule,
    TrendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
