import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './models/user';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(getUserArgs: GetUserArgs): Promise<User>;
    getUsers(getUsersArgs: GetUsersArgs): Promise<User[]>;
    createUser(createUserData: CreateUserInput): Promise<User>;
    updateUser(updateUserData: UpdateUserInput): Promise<User>;
    deleteUser(deleteUserData: DeleteUserInput): Promise<User>;
}
