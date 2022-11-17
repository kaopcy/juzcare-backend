import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MediasService } from 'src/medias/medias.service';
import { Media } from 'src/medias/models/media';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { Progress } from './models/progress';
import { ProgressesService } from './progresses.service';

@Resolver(() => Progress)
export class ProgressesResolver {
    constructor(
        private readonly progressesService: ProgressesService,
        private readonly usersService: UsersService,
        private readonly mediasService: MediasService
    ) {}

    @ResolveField(() => User)
    async user(@Parent() progress: Progress) {
        return await this.usersService.findById(progress.user._id)
    }

    @ResolveField(() => [Media], { nullable: true })
    async medias(@Parent() progress: Progress) {
        return this.mediasService.getMedias({_ids: progress.medias.map((m)=>m._id.toString())})
    }
}
