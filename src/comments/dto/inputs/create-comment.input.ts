import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

@InputType()
export class CreateCommentInput {
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกไอดีของรายงาน' })
    @IsString()
    reportId: string

    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // userId: string

    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกรายละเอียด' })
    @IsString()
    @MaxLength(200)
    body: string
}