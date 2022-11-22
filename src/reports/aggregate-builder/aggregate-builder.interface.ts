import { FilterEnum, OrderEnum, SortEnum } from "../dto/enum/query.enum"

export interface AggregateBuilder {
    aggregateMatchStatusType(filter: FilterEnum[]): void

    aggregateLookUpTags(): void
    
    aggregateProjectIsTags(checkTags: string[]): void
    aggregateSortByOrder(sort: SortEnum, order: OrderEnum): void
    aggregateMatchIsTags(checkTags: string[]): void
    aggregateProjectReport(): void
    aggregateUnwindTags(): void

    aggregateGroupByTagsCount(): void
    aggregateSortByTagsCount(): void
    aggregateRegexFindString(tagName: string): void
    aggregateMatchNotNullRegexFind(): void
    aggregateMatchVerifiedStatusTag(): void
    aggregateProjectPopularTags(): void
    
    aggregateSkip(skip: number): void
    aggregateLimit(limit: number): void
}