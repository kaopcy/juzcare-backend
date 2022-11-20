import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetAvatarsArgs {
    @Field(() => [String])
    @IsNotEmpty({ message: 'ไอดีอวตารว่างอยู่' })
    _ids: string[]
}