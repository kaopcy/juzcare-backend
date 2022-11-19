import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateMediaInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    imageUrl: string
}