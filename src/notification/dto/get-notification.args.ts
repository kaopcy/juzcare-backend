import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetNotificationArgs {
    @Field()
    @IsNotEmpty()
    _id: number;
}