import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetAvatarArgs {
    @Field(() => String)
    @IsNotEmpty({ message: 'ไอดีอวตารว่างอยู่' })
    _id: string
}