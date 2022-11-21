import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetNotificationByUserIdArgs {
    @Field()
    @IsNotEmpty({ message: 'ยังไม่มีไอดีผู้ใช้' })
    userId: string;
}