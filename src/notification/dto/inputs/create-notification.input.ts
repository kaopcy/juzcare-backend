import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Report } from "src/reports/models/report"
import { User } from "src/users/models/user"
import { NotifyTypeEnum } from "../enum/notify.enum"

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
    @IsEnum(NotifyTypeEnum)
    type: NotifyTypeEnum


}