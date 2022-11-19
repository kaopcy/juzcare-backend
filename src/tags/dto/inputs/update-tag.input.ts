import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { VerifyEnum } from "src/tags/enum/verify.enum"

@InputType()
export class UpdateTagInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    _id: string

    @Field()
    @IsNotEmpty()
    @IsEnum(VerifyEnum)
    status: VerifyEnum
}