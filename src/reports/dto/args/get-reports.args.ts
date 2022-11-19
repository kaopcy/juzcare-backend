import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsEnum, IsOptional, } from "class-validator";
import { FilterEnum, OrderEnum, SortEnum } from "../enum/query.enum";

@ArgsType()
export class GetReportsArgs {
    // @Field(() => [String])
    // @IsNotEmpty()
    // _ids: string[]

    @Field()
    @IsEnum(SortEnum)
    sort: SortEnum

    @Field()
    @IsEnum(OrderEnum)
    order: OrderEnum

    @Field()
    @IsEnum(FilterEnum)
    filter: FilterEnum

    @Field(() => [String], {name:'tags',nullable: true})
    tags: string[]

    @Field(() => Int)
    @IsOptional()
    page: 0

    @Field(() => Int)
    pageAmount: 6
    
}