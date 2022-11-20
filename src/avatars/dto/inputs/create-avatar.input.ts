import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateAvatarInput {
    @Field()
    @IsNotEmpty({ message: 'กรุณาใส่ลิ้งก์อวตาร' })
    @IsString()
    avatarUrl: string
}