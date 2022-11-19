import { NotAcceptableException } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Location {
    @Field()
    _id: string

    @Prop({ type: String, required: [true] })
    @Field()
    name: string

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const LocationSchema = SchemaFactory.createForClass(Location)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Location Constraint'));
        } else {
            next(error);
        }
    });

export type LocationDocument = Location & Document

// export class LocationDocument extends Document {}
