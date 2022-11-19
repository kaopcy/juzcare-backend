import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotAcceptableException } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Notification {
  @Field(() => ID)
  _id: string;

  @Prop({ type: String, required: true })
  @Field()
  userId: string;

  @Prop({ type: String, required: true })
  @Field()
  reportId: string;

  @Field()
  createdAt: Date;

  @Prop({ type: String, required: true })
  @Field()
  detail: string;

  @Prop({ type: Boolean, required: true, default: false })
  @Field(() => Boolean)
  isWatched: boolean;

  @Prop({
    type: String,
    required: [true],
    enum: ['UPVOTE', 'COMMENT', 'VERIFIED', 'INPROCESS', 'COMPLETE', 'TREND'],
  })
  @Field()
  type: string;
}

export const NotificationSchema = SchemaFactory.createForClass(
  Notification,
).post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new NotAcceptableException('Notification Constraint'));
  } else {
    next(error);
  }
});

export type NotificationDocument = Notification & Document;
