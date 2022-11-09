import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUsersArgs {
    @Field(() => [String])
    @IsNotEmpty()
    _ids: string[]
}