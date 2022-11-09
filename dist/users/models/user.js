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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
let User = class User {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'], unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "emailType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'String'] }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, required: [true, 'Boolean'], default: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], User.prototype, "isBanned", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User)
    .post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('email must be unique'));
    }
    else {
        next(error);
    }
});
//# sourceMappingURL=user.js.map