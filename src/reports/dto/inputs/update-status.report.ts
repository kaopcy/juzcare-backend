import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { FilterEnum } from "../enum/query.enum"

@InputType()
export class UpdateStatusReportInput {
    @Field()
    @IsNotEmpty({ message: 'ไอดีของรายงานว่างอยู่' })
    @IsString()
    reportId: string

    @Field()
    @IsNotEmpty({ message: 'ยังไม่มีสถานะ' })
    @IsEnum(FilterEnum, {message: 'type in not in VERIFIED | INPROGRESS | COMPLETE'})
    type: FilterEnum
}