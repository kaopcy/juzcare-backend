import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Media } from 'src/medias/models/media';
import { NotAcceptableException } from "@nestjs/common";

@Schema()
@ObjectType()
export class Review {
  @Prop({ type: String, default: null })
  @Field({ nullable: true })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Media.name }])
  @Field(() => [Media], { nullable: true })
  medias: Media[];

  @Prop({ type: Number, default: null })
  @Field({ nullable: true })
  star: number;

  @Field()
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review).post(
  'save',
  function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new NotAcceptableException('Review Constraint'));
    } else {
      next(error);
    }
  },
);
