import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetNotificationArgs {
    @Field()
    @IsNotEmpty({ message: 'ไอดีว่างอยู่' })
    _id: string;
}