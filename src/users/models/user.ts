import { NotAcceptableException } from "@nestjs/common";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Avatar } from "src/avatars/models/avatar";

@Schema({ timestamps: true })
@ObjectType()
export class User {
    @Field(() => ID)
    _id: string

    @Prop({ type: String, required: [true, 'String'], unique: [true] })
    @Field()
    email: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field()
    emailType: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field()
    username: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field({ nullable: true })
    password: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field()
    firstName: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field()
    lastName: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field()
    phone: string

    @Prop({ type: String, required: [true, 'String'] })
    @Field()
    role: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Avatar.name })
    @Field(() => Avatar, { nullable: true })
    avatar: Avatar

    @Prop({ type: Boolean, required: [true, 'Boolean'], default: false })
    @Field()
    isBanned: boolean

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new NotAcceptableException('email must be unique'));
    } else {
        next(error);
    }
});

export type UserDocument = User & Document

// export class UserDocument extends Document {}
