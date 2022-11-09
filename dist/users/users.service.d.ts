import { Model } from 'mongoose';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User, UserDocument } from './models/user';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserData: CreateUserInput): Promise<User>;
    updateUser(updateUserData: UpdateUserInput): Promise<User>;
    deleteUser(deleteUserData: DeleteUserInput): Promise<User>;
    getUser(getUserArgs: GetUserArgs): Promise<User>;
    getUsers(getUsersArgs: GetUsersArgs): Promise<User[]>;
    private findById;
}
