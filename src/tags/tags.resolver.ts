import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { CurrentUser } from 'src/auth/current-user.args';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateTagInput } from './dto/inputs/create-tag.input';
import { UpdateTagInput } from './dto/inputs/update-tag.input';
import { VerifyEnum } from './enum/verify.enum';
import { Tag } from './models/tag';
import { TagsService } from './tags.service';

@Resolver(() => Tag)
export class TagsResolver {
    constructor(
        private readonly tagsService: TagsService,
        private readonly adminsService: AdminsService,
    ) {}

    @Mutation(() => Tag)
    @UseGuards(GqlAuthGuard)
    async createTag(@CurrentUser() admin: Admin,@Args('createTagData') createTagData: CreateTagInput) : Promise<Tag> {
        const tag = await this.tagsService.createTag(createTagData)
        if (await this.adminsService.isAdmin(admin._id)) {
            return await this.updateStatusTag(admin, {_id: tag._id, status: "VERIFIED" as VerifyEnum})
        }
        return tag
    }

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
    async updateStatusTag(@CurrentUser() admin: Admin, @Args('updateTagData') updateTagData: UpdateTagInput) {
        await this.adminsService.verifyAdminRole(admin._id)
        return this.tagsService.updateStatus(updateTagData)
    }
}
