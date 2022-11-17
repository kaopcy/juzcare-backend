import { NotAcceptableException } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Media } from "src/medias/models/media";
import { User } from "src/users/models/user";

@Schema({ timestamps: true })
@ObjectType()
export class Progress {
    @Field()
    _id: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: [true] })
    @Field(() => User)
    user: User

    @Prop({ type: String, required: [true] })
    @Field()
    detail: string

    // @Prop([{type: String, required: [true]}])
    // @Field(() => [String])
    // imageUrls: string[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Media.name }])
    @Field(() => [Media], { nullable: true })
    medias: Media[]

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const ProgressSchema = SchemaFactory.createForClass(Progress)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Progress Constraint'));
        } else {
            next(error);
        }
    });

export type ProgressDocument = Progress & Document

// export class ProgressDocument extends Document {}
