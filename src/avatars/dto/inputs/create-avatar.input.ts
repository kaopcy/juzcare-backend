import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateAvatarInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    avatarUrl: string
}