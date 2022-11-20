import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateMediasInput {
    @Field(() => [String])
    @IsNotEmpty({ message: 'กรุณาใส่ลิงก์' })
    imageUrls: string[]
}