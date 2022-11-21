import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/models/user";
import { AuthUserService } from "../auth.service.user";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthUserService) {
        super({ usernameField: 'email' })
    }

    validate(email: string, password: string): Promise<User> {
        const user = this.authService.validate(email, password)
        if (!user) {
            throw new UnauthorizedException('ตรวจสอบอีเมล์และรหัสผ่าน')
        }
        return user
    }
}