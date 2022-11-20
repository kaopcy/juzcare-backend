import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetReportArgs {
    @Field()
    @IsNotEmpty({ message: 'ไอดียังว่างอยู่' })
    _id: string
}