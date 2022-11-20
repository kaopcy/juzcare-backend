import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminsService } from "src/admins/admins.service";
import { Admin } from "src/admins/models/admin";
import { User } from "src/users/models/user";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreElements: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(validationPayload: { email: string, sub: string }): Promise<User | Admin |null> {
        const user = await this.usersService.getUserByEmail(validationPayload.email)
        if (user) {
            return user
        }
        const admin = await this.adminsService.getAdminByEmail(validationPayload.email)
        if (admin) {
            return admin
        }
        return null
    }
}