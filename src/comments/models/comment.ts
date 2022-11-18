import { NotAcceptableException } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/users/models/user";

@Schema({ timestamps: true })
@ObjectType()
export class Comment {
    @Field()
    _id: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    @Field(() => User)
    user: User

    @Prop({ type: String, required: [true] })
    @Field()
    body: string

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Comment Constraint'));
        } else {
            next(error);
        }
    });

export type CommentDocument = Comment & Document

// export class CommentDocument extends Document {}
