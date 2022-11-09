import { Injectable, NotFoundException } from '@nestjs/common';
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
        // let user: User | (User & Document<any, any, any> & { _id: Types.ObjectId; }) | PromiseLike<User>
        // try {
        //     user = await this.userModel.create(createUserData)
        // } catch (error) {
        //     throw new Error('ccc')
        // }
        // if (!user) {
        //     throw new Error('ccc')
        // }
        return user
    }

    public async updateUser(updateUserData: UpdateUserInput): Promise<User> {
        // const _ = this .findById(updateUserData._id)
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
