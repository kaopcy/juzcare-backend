import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

@InputType()
export class CreateLocationInput {
    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // reportId: string

    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // userId: string

    @Field()
    @IsNotEmpty({ message: 'please fill location comment' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string
}