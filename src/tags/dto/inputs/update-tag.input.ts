import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { VerifyEnum } from "src/tags/enum/verify.enum"

@InputType()
export class UpdateTagInput {

    @Field()
    @IsNotEmpty({ message: 'ไอดียังว่างอยู่' })
    @IsString()
    _id: string

    @Field()
    @IsNotEmpty({ message: 'ยังไม่มีสถานะ' })
    @IsEnum(VerifyEnum)
    status: VerifyEnum
}