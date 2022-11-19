import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class UpdateTrendsInput {
    @Field(() => [String])
    @IsNotEmpty()
    _ids: string[]
}