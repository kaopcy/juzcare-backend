import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/users/models/user";
import { CurrentUser } from "./current-user.args";
import { LoginAuthArgs } from "./dto/args/login-auth.args";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { AuthAdmin } from "./models/authadmin";
import { AuthAdminService } from "./auth.service.admin";
import { Admin } from "src/admins/models/admin";
import { AdminsService } from "src/admins/admins.service";
import { CreateAdminInput } from "src/admins/dto/inputs/create-admin.input";

@Resolver(() => AuthAdmin)
export class AuthAdminResolver {
    constructor(
        private readonly authService: AuthAdminService,
        private readonly adminsService: AdminsService,
    ) { }

    @Query(() => AuthAdmin)
    async loginAdmin(@Args() loginAuthArgs: LoginAuthArgs): Promise<AuthAdmin> {
        return this.authService.login(loginAuthArgs)
    }

    @Query(() => AuthAdmin)
    @UseGuards(GqlAuthGuard)
    async getMeAdmin(@CurrentUser() admin: Admin) {
        return this.authService.getMe(admin.email)
    }

    // @Query(() => AuthAdmin)
    // @UseGuards(GqlAuthGuard)
    // async rePasswordUser(@CurrentUser() user: User, @Args() rePasswordAuthArgs: RePasswordAuthArgs) {
    //     return this.authService.rePassword(user, rePasswordAuthArgs)
    // }

    @Mutation(() => AuthAdmin)
    // @UseGuards(GqlAuthGuard)
    async registerAdmin(@Args('registerData') registerData: CreateAdminInput): Promise<Admin> {
        return this.authService.register(registerData)
    }

    @Mutation(() => User)
    @UseGuards(GqlAuthGuard)
    async deleteAdmin(@CurrentUser() user: User): Promise<Admin | null> {
        return this.adminsService.deleteAdmin({_id: user._id})
    }
}