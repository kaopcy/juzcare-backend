import { NotAcceptableException } from "@nestjs/common";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  mongoose, { Document } from "mongoose";
import { Report } from "src/reports/models/report";

@Schema({ timestamps: true })
@ObjectType()
export class Trend {
    @Field(() => ID)
    _id: string

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Report.name, required: [true] }])
    @Field(() => [Report])
    reports: Report[]

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const TrendSchema = SchemaFactory.createForClass(Trend)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Trend Constraint'));
        } else {
            next(error);
        }
    });

export type TrendDocument = Trend & Document

// export class TrendDocument extends Document {}
