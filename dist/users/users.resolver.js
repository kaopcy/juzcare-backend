"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const get_user_args_1 = require("./dto/args/get-user.args");
const get_users_args_1 = require("./dto/args/get-users.args");
const create_user_input_1 = require("./dto/inputs/create-user.input");
const delete_user_input_1 = require("./dto/inputs/delete-user.input");
const update_user_input_1 = require("./dto/inputs/update-user.input");
const user_1 = require("./models/user");
const users_service_1 = require("./users.service");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUser(getUserArgs) {
        return this.usersService.getUser(getUserArgs);
    }
    async getUsers(getUsersArgs) {
        return this.usersService.getUsers(getUsersArgs);
    }
    async createUser(createUserData) {
        return this.usersService.createUser(createUserData);
    }
    async updateUser(updateUserData) {
        return this.usersService.updateUser(updateUserData);
    }
    async deleteUser(deleteUserData) {
        return this.usersService.deleteUser(deleteUserData);
    }
};
__decorate([
    (0, graphql_1.Query)(() => user_1.User, { name: 'user', nullable: true }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_args_1.GetUserArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_1.User], { name: 'users', nullable: true }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_args_1.GetUsersArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, graphql_1.Args)('createUserData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_1.User, { nullable: true }),
    __param(0, (0, graphql_1.Args)('updateUserData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_1.User, { name: 'deleteUser', nullable: true }),
    __param(0, (0, graphql_1.Args)('deleteUserData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_user_input_1.DeleteUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map