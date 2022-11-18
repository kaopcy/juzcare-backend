import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class UpdateNotificationInput {
    @Field({ nullable: true })
    @IsNotEmpty()
    @IsString()
    _id: string
}