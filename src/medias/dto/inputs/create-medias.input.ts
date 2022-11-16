import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateMediasInput {
    @Field(() => [String])
    @IsNotEmpty()
    imageUrls: string[]
}