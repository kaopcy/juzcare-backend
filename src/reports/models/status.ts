import { NotAcceptableException } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Admin } from "src/admins/models/admin";

@Schema()
@ObjectType()
export class Status {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Admin.name, default: null })
    @Field(() => Admin, { nullable: true })
    admin?: Admin

    @Field()
    @Prop({ type: String, required: [true, 'String'], default: 'UNVERIFIED' })
    type: string
}

export const StatusSchema = SchemaFactory.createForClass(Status)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Status Constraint'));
        } else {
            next(error);
        }
    });

// export type StatusDocument = Status & Document
