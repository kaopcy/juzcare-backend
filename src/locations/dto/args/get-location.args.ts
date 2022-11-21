import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetLocationArgs {
    @Field(() => [String])
    @IsNotEmpty({ message: 'ไอดีโลเคชั่นว่างอยู่' })
    _id: string[]
}