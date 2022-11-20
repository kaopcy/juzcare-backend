import { NotAcceptableException } from "@nestjs/common";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Admin {
    @Field(() => ID)
    _id: string

    @Prop({ type: String, required: true, unique: true })
    @Field()
    email: string

    @Prop({ type: String, required: true })
    @Field({ nullable: true })
    password: string

    @Prop({ type: String, required: true })
    @Field()
    firstName: string

    @Prop({ type: String, required: true })
    @Field()
    lastName: string

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new NotAcceptableException('อีเมล์นี้ถูกใช้งานแล้ว'));
    } else {
        next(error);
    }
});

export type AdminDocument = Admin & Document

// export class AdminDocument extends Document {}
