import { FilterEnum, OrderEnum, SortEnum } from "../dto/enum/query.enum";
import { AggregateBuilder } from "./aggregate-builder.interface";

export class AggregateDirector {
    private builder: AggregateBuilder

    public setBuilder(builder: AggregateBuilder): void {
        this.builder = builder
    }

    public buildReportsAggregate(filter: FilterEnum[], checkTags: string[], sort: SortEnum, order: OrderEnum): void {
        this.builder.aggregateMatchStatusType(filter)
        this.builder.aggregateLookUpTags()
        this.builder.aggregateProjectIsTags(checkTags)
        this.builder.aggregateSortByOrder(sort, order)
        this.builder.aggregateMatchIsTags(checkTags)
        this.builder.aggregateProjectReport()
    }

    public buildPopularTags(tagName: string, skip: number, limit: number): void {
        this.builder.aggregateLookUpTags()
        this.builder.aggregateUnwindTags()
        this.builder.aggregateGroupByTagsCount()
        this.builder.aggregateSortByTagsCount()
        this.builder.aggregateRegexFindString(tagName)
        this.builder.aggregateMatchNotNullRegexFind()
        this.builder.aggregateMatchVerifiedStatusTag()
        this.builder.aggregateSkip(skip)
        this.builder.aggregateLimit(limit)
        this.builder.aggregateProjectPopularTags()
    }
} 