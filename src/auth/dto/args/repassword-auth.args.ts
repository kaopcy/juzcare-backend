import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class RePasswordAuthArgs {
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่านเดิม' })
    oldPassword: string

    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่านใหม่' })
    newPassword: string
}