import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetTagArgs {
    @Field()
    @IsNotEmpty()
    _id: string
}