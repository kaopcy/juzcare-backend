import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthArgs } from './dto/args/login-auth.args';
import { CreateUserInput } from 'src/users/dto/inputs/create-user.input';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { AuthAdmin } from './models/authadmin';
import { CreateAdminInput } from 'src/admins/dto/inputs/create-admin.input';


@Injectable()
export class AuthAdminService {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly jwtService: JwtService,
    ) { }

    public async validate(email: string, password: string): Promise<Admin | null> {
        const admin = await this.adminsService.getAdminByEmail(email)
        if (!admin) {
            return null
        }
        const passwordIsValided: boolean = await bcrypt.compare(password, admin.password)
        return passwordIsValided ? admin : null
    }

    public async login(loginAuthArgs: LoginAuthArgs): Promise<AuthAdmin | null> {
        const admin = await this.validate(loginAuthArgs.email, loginAuthArgs.password)
        if (!admin) {
            throw new NotFoundException('email or password incorrect')
        }
        return await this.createAuthAdmin(admin)
    }

    public async verify(token: string): Promise<Admin | null> {
        const decoded = await this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET
        })
        const admin = this.adminsService.getAdminByEmail(decoded.email)
        if (!admin) {
            throw new Error('Unable to get the admin from decoded token.')
        }
        return admin
    }

    public async getMe(email: string): Promise<Admin | null> {
        const admin = await this.adminsService.getAdminByEmail(email)
        if (! admin) {
            throw new NotFoundException('not found admin by email')
        }
        return this.createAuthAdmin(admin)
    }

    public async register(createAdminData: CreateAdminInput): Promise<Admin | null> {
        const admin = await this.adminsService.createAdmin(createAdminData)
        return this.createAuthAdmin(admin)
    }

    // public async rePassword(admin: Admin, rePasswordAuthArgs: RePasswordAuthArgs): Promise<AuthAdmin | null> {
    //     const userData = { _id: admin._id, ...rePasswordAuthArgs }
    //     const updated_user = await this.adminsService.rePasswordUser(userData)
    //     return this.createAuthAdmin(updated_user)
    // }

    private async generateToken(admin: Admin): Promise<string | null> {
        const payload = {
            email: admin.email,
            sub: admin._id.toString(),
        }
        const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        return access_token
    }

    private createAuthAdmin(admin: Admin): Promise<AuthAdmin | null> {
        const access_token = this.generateToken(admin)
        return { ...({ ...admin }['_doc']), access_token }
    }
}
