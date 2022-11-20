import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminInput } from './dto/inputs/create-admin.input';
import { Admin, AdminDocument } from './models/admin';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { DeleteUserInput } from 'src/users/dto/inputs/delete-user.input';
import { GetUserArgs } from 'src/users/dto/args/get-user.args';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    ) {}
        
    public async createAdmin(createAdminData: CreateAdminInput): Promise<Admin> {
        const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT))
        const hash = bcrypt.hashSync(createAdminData.password, salt);
        createAdminData.password = hash
        const admin = await this.adminModel.create(createAdminData)
        return admin
    }
        
    public async getAdmin(admin: Admin, getUserArgs: GetUserArgs): Promise<Admin> {
        await this.verifyAdminRole(admin._id)
        const _admin = await this.findById(getUserArgs._id)
        return _admin
    }
    public async getAdminByEmail(email: string): Promise<Admin | null> {
        const admin = this.adminModel.findOne({email: email})
        if (!admin) {
            return null
        }
        return admin as unknown as Admin
    }

    public async deleteAdmin(deleteAdminData: DeleteUserInput): Promise<Admin> {
        const user = await this.findById(deleteAdminData._id)
        const deleted_user = await this.adminModel.deleteOne({ _id: deleteAdminData._id }).exec()
        if (deleted_user.deletedCount === 0) {
            throw new NotFoundException('ไม่สามารถหาบัญชีผู้ใช้แอดมินได้')
        }
        return user
    }

    public async findById(_id: string): Promise<Admin> {
        let admin: Admin
        try {
            admin = await this.adminModel.findById(_id).exec()
        } catch (error) {
            throw new NotFoundException('ไม่สามารถหาบัญชีผู้ใช้แอดมินได้')
        }
        if (!admin) {
            return null
        }
        return admin
    }

    public async isAdmin(_id: string): Promise<boolean> {
        const admin = await this.findById(_id)
        return (admin) ? true: false
    }

    public async verifyAdminRole(_id: string) {
        const admin = await this.findById(_id)
        if (! admin) {
            throw new NotFoundException('บัญชีผู้ใช้ต้องเป็นแอดมินเท่านั้น')
        }
    }

}
