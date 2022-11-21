import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class LoginAuthArgs {
    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกอีเมล์' })
    email: string

    @Field()
    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
    password: string
}