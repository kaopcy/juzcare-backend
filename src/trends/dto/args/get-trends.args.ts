import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetTrendsArgs {
    @Field(() => [String])
    @IsNotEmpty()
    _ids: string[]
}