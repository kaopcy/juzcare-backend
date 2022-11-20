import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AvatarsService } from './avatars.service';
import { GetAvatarArgs } from './dto/args/get-avatar.args';
import { CreateAvatarInput } from './dto/inputs/create-avatar.input';
import { Avatar } from './models/avatar';

@Resolver(() => Avatar)
export class AvatarsResolver {
    constructor(
        private readonly avatarsService: AvatarsService
    ) {}

    @Mutation(() => Avatar)
    async createAvatar(@Args('createAvatarData') createAvatarData: CreateAvatarInput): Promise<Avatar> {
        return await this.avatarsService.createAvatar(createAvatarData)
    }

    // @Query(() => Avatar)
    // async getAvatar(getAvatarArgs: GetAvatarArgs): Promise<Avatar> {
    //     return await this.avatarsService.getAvatar(getAvatarArgs)
    // }

    @Query(() => Avatar)
    @UseGuards(GqlAuthGuard)
    async randomAvatar(): Promise<Avatar> {
        return await this.avatarsService.randomAvatar()
    }

    @Query(() => [Avatar])
    async getAllAvatars(): Promise<Avatar[]> {
        return await this.avatarsService.getAllAvatars()
    }
}
