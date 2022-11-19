import { NotAcceptableException } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from 'src/comments/models/comment';
import { Location } from 'src/locations/models/location';
import { Media } from 'src/medias/models/media';
import { Progress } from 'src/progresses/models/progress';
import { Tag } from 'src/tags/models/tag';
import { User } from 'src/users/models/user';
import { Status, StatusSchema } from './status';
import { Review, ReviewSchema } from './review';

@Schema({ timestamps: true })
@ObjectType()
export class Report {
    @Field(() => ID)
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Field(() => User)
    user: User;

    @Prop({ type: String, required: [true] })
    @Field()
    detail: string;

    @Prop({ type: String, required: [true] })
    @Field()
    title: string;

    @Prop({ type: String, required: [true] })
    @Field()
    locationDetail: string;

    @Prop({ type: StatusSchema, required: [true] })
    @Field(() => Status, { nullable: true })
    status: Status;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Location.name })
    @Field(() => Location, { nullable: true })
    location: Location;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
    @Field(() => [User], { nullable: true })
    upVotes: User[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Media.name }])
    @Field(() => [Media], { nullable: true })
    medias: Media[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Comment.name }])
    @Field(() => [Comment], { nullable: true })
    comments: Comment[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Progress.name }])
    @Field(() => [Progress], { nullable: true })
    progresses: Progress[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }])
    @Field(() => [Tag], { nullable: true })
    tags: Tag[];

    @Prop({ type: ReviewSchema, required: true })
    @Field(() => Review, { nullable: true })
    review: Review;

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report).post(
    'save',
    function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Report Constraint'));
        } else {
            next(error);
        }
    },
);

export type ReportDocument = Report & Document;

// export class ReportDocument extends Document {}
