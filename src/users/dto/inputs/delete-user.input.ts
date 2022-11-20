import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class DeleteUserInput {
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกไอดี' })
    @IsString()
    _id: string
}