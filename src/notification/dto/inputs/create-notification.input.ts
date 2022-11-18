import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { Report } from "src/reports/models/report"
import { User } from "src/users/models/user"

@InputType()
export class CreateNotificationInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    report: Report

    @Field()
    @IsNotEmpty()
    user: User

    // @Field()
    // @IsNotEmpty()
    // @IsString()
    // detail: string

    @Field()
    @IsNotEmpty()
    @IsString()
    type: string


}