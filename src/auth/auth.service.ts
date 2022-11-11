import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthArgs } from './dto/args/login-auth.args';
import { AuthUser } from './models/authuser';
import { RePasswordAuthArgs } from "./dto/args/repassword-auth.args";
import { CreateUserInput } from 'src/users/dto/inputs/create-user.input';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
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
            throw new NotFoundException('email or password incorrect')
        }
        return await this.createAuthUser(user)
    }

    public async verify(token: string): Promise<User | null> {
        const decoded = await this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET
        })
        const user = this.usersService.getUserByEmail(decoded.email)
        if (!user) {
            throw new Error('Unable to get the user from decoded token.')
        }
        return user
    }

    public async getMe(email: string): Promise<AuthUser | null> {
        const user = await this.usersService.getUserByEmail(email)
        return this.createAuthUser(user)
    }

    public async register(createUserData: CreateUserInput): Promise<AuthUser | null> {
        const user = await this.usersService.createUser(createUserData)
        return this.createAuthUser(user)
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
        const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        return access_token
    }

    private createAuthUser(user: User): Promise<AuthUser | null> {
        const access_token = this.generateToken(user)
        return { ...({ ...user }['_doc']), access_token }
    }
}
