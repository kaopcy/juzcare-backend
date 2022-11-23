import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/users/models/user";
import { UsersService } from "src/users/users.service";
import { CurrentUser } from "./current-user.args";
import { LoginAuthArgs } from "./dto/args/login-auth.args";
import { RePasswordAuthArgs } from "./dto/args/repassword-auth.args";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { AuthUser } from "./models/authuser";
import { CreateUserInput } from "src/users/dto/inputs/create-user.input";
import { AuthUserService } from "./auth.service.user";
import { Avatar } from "src/avatars/models/avatar";
import { AvatarsService } from "src/avatars/avatars.service";

@Resolver(() => AuthUser)
export class AuthUserResolver {
    constructor(
        private readonly authUserService: AuthUserService,
        private readonly usersService: UsersService,
        private readonly avatarsService: AvatarsService,
    ) { }

    @Query(() => AuthUser)
    async loginUser(@Args() loginAuthArgs: LoginAuthArgs): Promise<AuthUser> {
        return this.authUserService.login(loginAuthArgs)
    }

    @Query(() => AuthUser)
    @UseGuards(GqlAuthGuard)
    async getMeUser(@CurrentUser() user: User) {
        return this.authUserService.getMeUser(user.email)
    }

    @Query(() => AuthUser)
    @UseGuards(GqlAuthGuard)
    async rePasswordUser(@CurrentUser() user: User, @Args() rePasswordAuthArgs: RePasswordAuthArgs) {
        return this.authUserService.rePassword(user, rePasswordAuthArgs)
    }

    @Mutation(() => AuthUser)
    // @UseGuards(GqlAuthGuard)
    async registerUser(@Args('registerData') registerData: CreateUserInput): Promise<User> {
        return this.authUserService.register(registerData)
    }

    @Mutation(() => User, {name: 'deleteUser'})
    @UseGuards(GqlAuthGuard)
    async deleteUser(@CurrentUser() user: User): Promise<User | null> {
        return this.usersService.deleteUser({_id: user._id})
    }

    @ResolveField(() => Avatar, { nullable: true })
    async avatar(@Parent() authUser: AuthUser): Promise<Avatar> {
        console.log(authUser);
        
        return await this.avatarsService.getAvatar({_id: authUser.avatar._id})
    }

    // // //
}