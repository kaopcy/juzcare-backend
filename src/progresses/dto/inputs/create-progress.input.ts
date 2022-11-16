import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateProgressInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    reportId: string

    @Field()
    @IsNotEmpty({ message: 'please fill detail' })
    @IsString()
    detail: string

    @Field(() => [String])
    @IsNotEmpty()
    imageUrls: []
}