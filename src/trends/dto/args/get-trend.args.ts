import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetTrendArgs {
    @Field()
    @IsNotEmpty({ message: 'กรุณาใส่ไอดีของเทรน' })
    _id: string
}