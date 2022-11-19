import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.args';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AvatarsService } from 'src/avatars/avatars.service';
import { Avatar } from 'src/avatars/models/avatar';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
// import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateAvatarUserInput } from './dto/inputs/update-avatar-user.input';
// import { CreateUserInput } from './dto/inputs/create-user.input';
// import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './models/user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly avatarsService: AvatarsService,
    ) { }

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
        return this.usersService.getUser(getUserArgs)
    }

    @Query(() => [User], { name: 'users', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
        return this.usersService.getUsers(getUsersArgs)
    }

    // @Mutation(() => User)
    // @UseGuards(GqlAuthGuard)
    // async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    //     return this.usersService.createUser(createUserData)
    // }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GqlAuthGuard)
    async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
        return this.usersService.updateUser(updateUserData)
    }

    @ResolveField(() => Avatar, { nullable: true })
    async avatar(@Parent() user: User): Promise<Avatar> {
        return await this.avatarsService.getAvatar({_id: user.avatar._id})
    }

    @Mutation(()=>User)
    @UseGuards(GqlAuthGuard)
    async updateAvatarUser(@CurrentUser() user: User, @Args('updateUserAvatarId') updateAvatarUserData: UpdateAvatarUserInput):Promise<User> {
        return this.usersService.updateAvatarUser(user, updateAvatarUserData.avatarId)
    }

    // @Mutation(() => User, { name: 'deleteUser', nullable: true })
    // @UseGuards(GqlAuthGuard)
    // async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput) {
    //     return this.usersService.deleteUser(deleteUserData)
    // }
}
