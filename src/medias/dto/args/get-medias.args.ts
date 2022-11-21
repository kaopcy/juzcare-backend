import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetMediasArgs {
    @Field(() => [String])
    @IsNotEmpty({ message: 'ไอดีมีเดียว่างอยู่' })
    _ids: string[]
}