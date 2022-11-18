import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './models/comment';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/models/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CommentsService, CommentsResolver, UsersService],
})
export class CommentsModule {}
