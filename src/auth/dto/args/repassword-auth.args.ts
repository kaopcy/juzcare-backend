import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class RePasswordAuthArgs {
    @Field()
    @IsNotEmpty()
    oldPassword: string

    @Field()
    @IsNotEmpty()
    newPassword: string
}