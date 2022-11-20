import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class CreateTagInput {

    @Field()
    @IsNotEmpty({ message: 'ชื่อแท็กยังว่างอยู่' })
    @IsString()
    name: string

    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // status: string
}