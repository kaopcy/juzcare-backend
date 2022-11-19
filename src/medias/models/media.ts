import { NotAcceptableException } from "@nestjs/common";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
@ObjectType()
export class Media {
    @Field(() => ID)
    _id: string

    @Prop({ type: String, required: [true] })
    @Field()
    imageUrl: string

    // @Prop({type: Boolean, required: true })
    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const MediaSchema = SchemaFactory.createForClass(Media)
    .post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            next(new NotAcceptableException('Media Constraint'));
        } else {
            next(error);
        }
    });

export type MediaDocument = Media & Document

// export class MediaDocument extends Document {}
