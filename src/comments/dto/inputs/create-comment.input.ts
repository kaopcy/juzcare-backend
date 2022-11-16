import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

@InputType()
export class CreateCommentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    reportId: string

    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // userId: string

    @Field()
    @IsNotEmpty({ message: 'please fill body comment' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    body: string
}