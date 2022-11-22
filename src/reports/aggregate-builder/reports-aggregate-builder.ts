import { FilterEnum, OrderEnum, SortEnum } from "../dto/enum/query.enum";
import { length, project } from "../dto/pipeline/aggregate.pipeline";
import { AggregatePipeline } from "./aggregate-pipeline";
import { AggregateBuilder } from "./aggregate-builder.interface";

export class ReportsAggregateBuilder implements AggregateBuilder {
    private aggregate: AggregatePipeline

    constructor() {
        this.reset()
    }


    public reset(): void {
        this.aggregate = new AggregatePipeline()
    }

    aggregateMatchStatusType(filter: FilterEnum[]): void {
        this.aggregate.pipeline.push(
            { $match: { 'status.type': { $in: filter.length ? filter : ["UNVERIFIED", "VERIFIED", "INPROGRESS", "COMPLETE"] } } },
        )
    }

    aggregateLookUpTags(): void {
        this.aggregate.pipeline.push(
            {
                $lookup:
                {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "_tags"
                }
            }
        )
    }

    aggregateProjectIsTags(checkTags: string[]): void {
        this.aggregate.pipeline.push(
            {
                $project: {
                    ...project, ...length, ...  { 'isTags': { $gt: [{ $size: { $setIntersection: [checkTags, '$_tags.name'] } }, 0] } }
                }
            }
        )
    }
    aggregateSortByOrder(sort: SortEnum, order: OrderEnum): void {
        this.aggregate.pipeline.push(
            {
                $sort: sort == SortEnum.sortByLike
                    ? { 'upVotesLength': order == OrderEnum.ascending ? 1 : -1 } :
                    sort == SortEnum.sortByComment
                        ? { 'commentsLength': order == OrderEnum.ascending ? 1 : -1 } :
                        { 'createdAt': order == OrderEnum.ascending ? 1 : -1 }
            }
        )
    }

    aggregateMatchIsTags(checkTags: string[]): void {
        this.aggregate.pipeline.push(
            { $match: { 'isTags': (checkTags.length) ? true : false } },
        )
    }
    aggregateProjectReport(): void {
        this.aggregate.pipeline.push(
            {
                $project: {
                    '_id': 1,
                    'user': 1,
                    'detail': 1,
                    'title': 1,
                    'locationDetail': 1,
                    'status': 1,
                    'location': 1,
                    'upVotes': 1,
                    'medias': 1,
                    'comments': 1,
                    'progresses': 1,
                    'tags': 1,
                    'review': 1,
                    'createdAt': 1,
                    'updatedAt': 1,
                }
            },
        )
    }

    aggregateUnwindTags(): void {
        this.aggregate.pipeline.push(
            { $unwind: '$_tags' }
        )
    }

    aggregateGroupByTagsCount(): void {
        this.aggregate.pipeline.push(
            { $group: { _id: "$_tags", count: { $sum: 1 } } }
        )
    }
    aggregateSortByTagsCount(): void {
        this.aggregate.pipeline.push(
            { $sort: { 'count': -1 } }
        )
    }
    aggregateRegexFindString(tagName: string): void {
        this.aggregate.pipeline.push(
            {
                $addFields: {
                    returnObject: {
                        $regexFind: { input: { $toLower: "$_id.name" }, regex: { $toLower: tagName } }
                    }
                }
            }
        )
    }
    aggregateMatchNotNullRegexFind(): void {
        this.aggregate.pipeline.push(
            { $match: { returnObject: { $ne: null } } }
        )
    }
    
    aggregateMatchVerifiedStatusTag(): void {
        this.aggregate.pipeline.push(
            { $match: { '_id.status': { $eq: 'VERIFIED' } } }
        )
    }

    aggregateProjectPopularTags(): void {
        this.aggregate.pipeline.push(
            {
                $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    status: '$_id.status',
                    createdAt: '$_id.createdAt',
                    updatedAt: '$_id.updatedAt',
                    count: '$count',
                }
            }
        )
    }
    aggregateSkip(skip: number): void {
        this.aggregate.pipeline.push(
            { $skip: skip },
        )
    }
    aggregateLimit(limit: number): void {
        this.aggregate.pipeline.push(
            { $limit: limit },
        )
    }

    public getAggregate(): AggregatePipeline {
        const result = this.aggregate
        this.reset()
        return result
    }

}