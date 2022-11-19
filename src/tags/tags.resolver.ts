import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { CurrentUser } from 'src/auth/current-user.args';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UpdateTagInput } from './dto/inputs/update-tag.input';
import { Tag } from './models/tag';
import { TagsService } from './tags.service';

@Resolver(() => Tag)
export class TagsResolver {
    constructor(
        private readonly tagsService: TagsService,
        private readonly adminsService: AdminsService,
    ) {}

    @Query(() => [Tag])
    async getVerifiedTags(): Promise<Tag[]> {
        return this.tagsService.getVeifiedTags()
    }

    @Query(() => [Tag])
    async getAllTags(): Promise<Tag[]> {
        return this.tagsService.getAllTags()
    }

    @Mutation(() => Tag)
    @UseGuards(GqlAuthGuard)
    async updateStatus(@CurrentUser() admin: Admin, @Args('updateTagData') updateTagData: UpdateTagInput) {
        await this.adminsService.verifyAdminRole(admin._id)
        return this.tagsService.updateStatus(updateTagData)
    }
}
