import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetTrendsArgs {
    @Field(() => [String])
    @IsNotEmpty({ message: 'กรุณาใส่ไอดีของเทรน' })
    _ids: string[]
}