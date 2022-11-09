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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_1 = require("./models/user");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserData) {
        const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT));
        const hash = bcrypt.hashSync(createUserData.password, salt);
        createUserData.password = hash;
        const user = await this.userModel.create(createUserData);
        return user;
    }
    async updateUser(updateUserData) {
        const updated_user = this.userModel.findByIdAndUpdate(updateUserData._id, updateUserData, { new: true });
        return updated_user;
    }
    async deleteUser(deleteUserData) {
        const user = await this.findById(deleteUserData._id);
        const deleted_user = await this.userModel.deleteOne({ _id: deleteUserData._id }).exec();
        if (deleted_user.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find user id.');
        }
        return user;
    }
    async getUser(getUserArgs) {
        const user = await this.userModel.findById(getUserArgs._id).exec();
        return user;
    }
    async getUsers(getUsersArgs) {
        if (!getUsersArgs._ids.length) {
            return [];
        }
        return this.userModel.find({ _id: { $in: getUsersArgs._ids } });
    }
    async findById(_id) {
        let user;
        try {
            user = await this.userModel.findById(_id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        if (!user) {
            return null;
        }
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map