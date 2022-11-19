import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetAvatarArgs {
    @Field(() => String)
    @IsNotEmpty()
    _id: string
}