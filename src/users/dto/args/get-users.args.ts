import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUsersArgs {
    @Field(() => [String])
    @IsNotEmpty({ message: 'กรุณากรอกไอดี' })
    _ids: string[]
}