import { Field, ID, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"


@InputType()
export class UpdateAvatarUserInput {
    @Field(() => ID)
    @IsNotEmpty({ message: 'กรุณากรอกอวตารไอดี' })
    @IsString()
    avatarId: string
}