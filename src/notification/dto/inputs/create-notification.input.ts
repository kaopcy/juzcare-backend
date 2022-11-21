import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { Report } from "src/reports/models/report"
import { User } from "src/users/models/user"

@InputType()
export class CreateNotificationInput {
    @Field()
    @IsNotEmpty({ message: 'ยังไม่มีการรายงาน' })
    @IsString()
    report: Report

    @Field()
    @IsNotEmpty({ message: 'ยังไม่มีผู้ใช้' })
    user: User

    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // detail: string

    @Field()
    @IsNotEmpty({ message: 'ยังไม่มีรายละเอียด' })
    @IsString()
    type: string


}