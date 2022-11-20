import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Report } from "./report";

@ObjectType()
export class PaginateReport {

    @Field(() => Int)
    currentPage: number

    @Field(() => Int)
    nextPage: number

    @Field(() => [Report])
    reports: Report[]
}
