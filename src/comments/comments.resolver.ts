import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from './comments.service';
import { Comment } from './models/comment';

@Resolver(() => Comment)
export class CommentsResolver {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly usersService: UsersService
    ) {}

    @ResolveField(() => User)
    async user(@Parent() comment: Comment) {
        return await this.usersService.findById(comment.user._id)
    }
}
