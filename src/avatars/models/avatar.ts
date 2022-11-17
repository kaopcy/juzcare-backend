import { NotAcceptableException } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Avatar {
    @Field()
    _id: string

    @Prop({ type: String, required: [true] })
    @Field()
    avatarUrl: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Avatar Constraint'));
        } else {
            next(error);
        }
    });

export type AvatarDocument = Avatar & Document

// export class AvatarDocument extends Document {}
