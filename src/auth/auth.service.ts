import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthUser } from './models/authuser';
import { AvatarsService } from 'src/avatars/avatars.service';
import { Admin } from 'src/admins/models/admin';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly avatarsService: AvatarsService,
    ) { }

    public async generateToken(account: Admin | User): Promise<string | null> {
        const payload = {
            email: account.email,
            sub: account._id.toString(),
        }
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        return accessToken
    }

    public createAuthUser(account: User | Admin): Promise<AuthUser | null> {
        const accessToken = this.generateToken(account)
        return { ...({ ...account }['_doc']), accessToken }
    }

}
