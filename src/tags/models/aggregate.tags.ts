import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Tag } from "./tag";

@ObjectType()
export class AggregateTags extends Tag {
    @Field(() => Int)
    count: number
}