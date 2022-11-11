import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class LoginAuthArgs {
    @Field()
    @IsNotEmpty()
    email: string

    @Field()
    @IsNotEmpty()
    password: string
}