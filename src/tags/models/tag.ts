import { NotAcceptableException } from "@nestjs/common";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Tag {
    @Field(() => ID)
    _id: string

    @Prop({ type: String, required: [true] })
    @Field()
    name: string

    @Prop({ type: String, required: [true], default:'UNVERIFIED' ,enum:['UNVERIFIED','VERIFIED'] })
    @Field()
    status: string

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const TagSchema = SchemaFactory.createForClass(Tag)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Tag Constraint'));
        } else {
            next(error);
        }
    });

export type TagDocument = Tag & Document

// export class TagDocument extends Document {}
