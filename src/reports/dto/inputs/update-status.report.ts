import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { FilterEnum } from "../enum/query.enum"

@InputType()
export class UpdateStatusReportInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    reportId: string

    @Field()
    @IsNotEmpty()
    @IsEnum(FilterEnum, {message: 'type in not in VERIFIED | INPROGRESS | COMPLETE'})
    type: FilterEnum
}