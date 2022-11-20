import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetProgressesArgs {
    @Field(() => [String])
    @IsNotEmpty({ message: 'ไอดียังว่างอยู่' })
    _ids: string[]
}