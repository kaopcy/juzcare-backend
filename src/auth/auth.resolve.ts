import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AdminsService } from "src/admins/admins.service";
import { Admin } from "src/admins/models/admin";
import { AvatarsService } from "src/avatars/avatars.service";
import { Avatar } from "src/avatars/models/avatar";
import { User } from "src/users/models/user";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.args";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { AuthUser } from "./models/authuser";

@Resolver(() => AuthUser)
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService,
        private readonly avatarsService: AvatarsService,
        private readonly authService: AuthService
    ) { }

    @Query(() => AuthUser)
    @UseGuards(GqlAuthGuard)
    async getMe(@CurrentUser() account: Admin | User) {
        const user = await this.usersService.getUserByEmail(account.email)
        if (user) {
            const token = await this.authService.generateToken(user)
            return { ...{ ...user }['_doc'], accessToken:token }
        }
        const admin = await this.adminsService.getAdminByEmail(account.email)
        if (admin) {
            const token = await this.authService.generateToken(admin)
            return { ...{ ...({ ...admin }['_doc'])}, emailType: "", avatar: (await this.avatarsService.getAllAvatars())[0], isBanned: false, phone: "", role: "", username: "", accessToken: token } as unknown as AuthUser
        }
        return null
    }

    @ResolveField(() => Avatar, { nullable: true })
    async avatar(@Parent() authUser: AuthUser): Promise<Avatar> {
        return await this.avatarsService.getAvatar({_id: authUser.avatar._id})
    }
}