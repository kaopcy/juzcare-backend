import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/users/models/user";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.args";
import { LoginAuthArgs } from "./dto/args/login-auth.args";
import { RePasswordAuthArgs } from "./dto/args/repassword-auth.args";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { AuthUser } from "./models/authuser";
import { CreateUserInput } from "src/users/dto/inputs/create-user.input";

@Resolver(() => AuthUser)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Query(() => AuthUser)
    async login(@Args() loginAuthArgs: LoginAuthArgs): Promise<AuthUser> {
        return this.authService.login(loginAuthArgs)
    }

    @Query(() => AuthUser)
    @UseGuards(GqlAuthGuard)
    async getMe(@CurrentUser() user: User) {
        return this.authService.getMe(user.email)
    }

    @Query(() => AuthUser)
    @UseGuards(GqlAuthGuard)
    async rePassword(@CurrentUser() user: User, @Args() rePasswordAuthArgs: RePasswordAuthArgs) {
        return this.authService.rePassword(user, rePasswordAuthArgs)
    }

    @Mutation(() => AuthUser)
    // @UseGuards(GqlAuthGuard)
    async register(@Args('registerData') registerData: CreateUserInput): Promise<User> {
        return this.authService.register(registerData)
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async deleteUser(@CurrentUser() user: User): Promise<User | null> {
        return this.usersService.deleteUser({_id: user._id})
    }
}