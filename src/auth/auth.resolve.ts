import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AdminsService } from "src/admins/admins.service";
import { Admin } from "src/admins/models/admin";
import { AvatarsService } from "src/avatars/avatars.service";
import { User } from "src/users/models/user";
import { UsersService } from "src/users/users.service";
import { AuthUserService } from "./auth.service.user";
import { CurrentUser } from "./current-user.args";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { AuthUser } from "./models/authuser";

@Resolver(() => AuthUser)
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService,
        private readonly avatarsService: AvatarsService,
    ) { }

    @Query(() => AuthUser)
    @UseGuards(GqlAuthGuard)
    async getMe(@CurrentUser() account: Admin | User) {
        const user = await this.usersService.getUserByEmail(account.email)
        if (user) {
            return user
        }
        
        const admin = await this.adminsService.getAdminByEmail(account.email)
        if (admin) {
            return { ...{ ...({ ...admin }['_doc'])}, emailType: "", avatar: (await this.avatarsService.getAllAvatars())[0], isBanned: false, phone: "", role: "", username: "" } as unknown as AuthUser
        }
        return null
    }
}