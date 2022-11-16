import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { Progress } from './models/progress';
import { ProgressesService } from './progresses.service';

@Resolver(() => Progress)
export class ProgressesResolver {
    constructor(
        private readonly progressesService: ProgressesService,
        private readonly usersService: UsersService,
    ) {}

    @ResolveField(() => User)
    async user(@Parent() progress: Progress) {
        return await this.usersService.findById(progress.user._id)
    }
}
