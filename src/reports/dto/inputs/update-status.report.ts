import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class UpdateStatusReportInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    reportId: string

    @Field()
    @IsNotEmpty()
    @IsString()
    type: string
}