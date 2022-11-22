import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthArgs } from './dto/args/login-auth.args';
import { AuthUser } from './models/authuser';
import { RePasswordAuthArgs } from "./dto/args/repassword-auth.args";
import { CreateUserInput } from 'src/users/dto/inputs/create-user.input';
import { AvatarsService } from 'src/avatars/avatars.service';
import { Avatar } from 'src/avatars/models/avatar';


@Injectable()
export class AuthUserService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly avatarsService: AvatarsService,
    ) { }

    public async validate(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.getUserByEmail(email)
        if (!user) {
            return null
        }
        const passwordIsValided: boolean = await bcrypt.compare(password, user.password)
        return passwordIsValided ? user : null
    }

    public async login(loginAuthArgs: LoginAuthArgs): Promise<AuthUser | null> {
        const user = await this.validate(loginAuthArgs.email, loginAuthArgs.password)
        if (!user) {
            throw new NotFoundException('อีเมล์หรือรหัสของผู้ใช้ไม่ถูกต้อง')
        }
        return this.createAuthUser(user)
    }

    public async verify(token: string): Promise<User | null> {
        const decoded = await this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET
        })
        const user = this.usersService.getUserByEmail(decoded.email)
        if (!user) {
            throw new Error('ไม่สามารถหาชื่อผู้ใช้ได้')
        }
        return user
    }

    public async getMeUser(email: string): Promise<AuthUser | null> {
        const user = await this.usersService.getUserByEmail(email)
        if (! user) {
            throw new NotFoundException('ไม่สามารถหาชื่อผู้ใช้ได้')
        }
        return this.createAuthUser(user)
    }

    public async register(createUserData: CreateUserInput): Promise<AuthUser | null> {
        const avatar = await this.getRandomAvatar()
        const user = await this.usersService.createUser(createUserData)
        const update_avatar_user = await this.usersService.updateAvatarUser(user, avatar._id.toString())
        return await this.createAuthUser(update_avatar_user)
    }

    public async rePassword(user: User, rePasswordAuthArgs: RePasswordAuthArgs): Promise<AuthUser | null> {
        const userData = { _id: user._id, ...rePasswordAuthArgs }
        const updated_user = await this.usersService.rePasswordUser(userData)
        return this.createAuthUser(updated_user)
    }

    private async generateToken(user: User): Promise<string | null> {
        const payload = {
            email: user.email,
            sub: user._id.toString(),
        }
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        return accessToken
    }

    private createAuthUser(user: User): Promise<AuthUser | null> {
        const accessToken = this.generateToken(user)
        return { ...({ ...user }['_doc']), accessToken }
    }

    private async getRandomAvatar(): Promise<Avatar> {
        const avatars = await this.avatarsService.getAllAvatars()
        const avatar = avatars[Math.floor(Math.random()*avatars.length)]
        return avatar 
    }
}
