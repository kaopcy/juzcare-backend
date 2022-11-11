import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User, UserDocument } from './models/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    public async createUser(createUserData: CreateUserInput): Promise<User> {
        const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT))
        const hash = bcrypt.hashSync(createUserData.password, salt);
        createUserData.password = hash
        const user = await this.userModel.create(createUserData)
        return user
    }

    public async updateUser(updateUserData: UpdateUserInput): Promise<User> {
        const updated_user = this.userModel.findByIdAndUpdate(updateUserData._id, updateUserData, { new: true })
        return updated_user
    }

    public async deleteUser(deleteUserData: DeleteUserInput): Promise<User> {
        const user = await this.findById(deleteUserData._id)
        const deleted_user = await this.userModel.deleteOne({ _id: deleteUserData._id }).exec()
        if (deleted_user.deletedCount === 0) {
            throw new NotFoundException('Could not find user id.')
        }
        return user
    }


    public async getUser(getUserArgs: GetUserArgs): Promise<User> {
        const user = await this.userModel.findById(getUserArgs._id).exec()
        return user
    }

    public async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
        if (!getUsersArgs._ids.length) {
            return []
        }
        return this.userModel.find({ _id: { $in: getUsersArgs._ids } })
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email: email })
        if (!user) {
            return null
        }
        return user as unknown as User
    }

    public async rePasswordUser(userData: { _id: string, oldPassword: string, newPassword: string }): Promise<any> {
        const user = await this.findById(userData._id)
        if (!user) {
            throw new NotFoundException('Could not find user.')
        }
        const passwordIsValided: boolean = await bcrypt.compare(userData.oldPassword, user.password)
        
        if (!passwordIsValided) {
            throw new NotAcceptableException('old password incorrect')
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT))
        const hash = bcrypt.hashSync(userData.newPassword, salt)
        user.password = hash
        return this.updateUser(user)
    }

    private async findById(_id: string): Promise<User> {
        let user: User
        try {
            user = await this.userModel.findById(_id).exec()
        } catch (error) {
            throw new NotFoundException('Could not find user.')
        }
        if (!user) {
            return null
        }
        return user
    }

}
