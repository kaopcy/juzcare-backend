import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admins/models/admin';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentInput } from 'src/comments/dto/inputs/create-comment.input';
import { MediasService } from 'src/medias/medias.service';
import { NotificationService } from 'src/notification/notification.service';
import { CreateProgressInput } from 'src/progresses/dto/inputs/create-progress.input';
import { ProgressesService } from 'src/progresses/progresses.service';
import { TagsService } from 'src/tags/tags.service';
import { User } from 'src/users/models/user';
import { CreateReportInput } from './dto/inputs/create-report.input';
import { UpdateStatusReportInput } from './dto/inputs/update-status.report';
import { UpdateReviewReportInput } from './dto/inputs/update-review.dto';
import { Report, ReportDocument } from './models/report';
import { TrendsService } from 'src/trends/trends.service';
import { Cron } from '@nestjs/schedule';
import { GetReportsArgs } from './dto/args/get-reports.args';
import { PaginateReport } from './models/paginate.report';
import { GetPopularTagsArgs } from './dto/args/get-popular-tags.args';
import { DeleteReportInput } from './dto/inputs/delete-report.input';
import { NotifyTypeEnum } from 'src/notification/dto/enum/notify.enum';
import { ReportsAggregateBuilder } from './aggregate-builder/reports-aggregate-builder';
import { AggregateDirector } from './aggregate-builder/aggregate-director';
import { CreateReportFacade } from './report-facade/create-report.facade';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel(Report.name)
        private readonly reportModel: Model<ReportDocument>,
        private readonly mediasService: MediasService,
        private readonly commentsService: CommentsService,
        private readonly progressesService: ProgressesService,
        private readonly notificationService: NotificationService,
        private readonly trendsService: TrendsService,
        private readonly createReportFacade: CreateReportFacade,
    ) { }

    private readonly logger = new Logger(ReportsService.name);

    async createReport(user: User, reportData: CreateReportInput,): Promise<Report> {
        const _reportData = await this.createReportFacade.operation(reportData)
        // const _medias = [];
        // if (reportData.medias?.length) {
        //     for (const m of reportData.medias) {
        //         const media = await this.mediasService.createMedia(m);
        //         _medias.push(media._id);
        //     }
        // }
        // reportData.medias = _medias;

        // const _tags = [];

        // if (reportData.tags.length) {
        //     for (const tag of reportData.tags) {
        //         // console.log(tag, !mongoose.Types.ObjectId.isValid(tag));
        //         if (!mongoose.Types.ObjectId.isValid(tag)) {
        //             const _tag = await this.tagsService.createTag({ name: tag })
        //             _tags.push(_tag._id.toString());
        //         } else {
        //             _tags.push(tag);
        //         }
        //     }
        //     reportData.tags = _tags;
        // }

        const _report = {
            ...{ user: user._id.toString() },
            ..._reportData,
            status: {},
            review: {},
        };
        const report = await this.reportModel.create(_report);
        return report;
    }

    async upVoteReport(user: User, reportId: string): Promise<Report> {
        // console.log('user',user);

        const report = await this.findByReportId(reportId);
        if (!report) {
            throw new NotFoundException('ไม่สามารถหาการรายงานนั้นได้');
        }
        const isUpVoted = await this.reportModel.find({
            _id: reportId,
            upVotes: user._id,
        });
        if (!isUpVoted.length) {
            await this.reportModel.findByIdAndUpdate(reportId, {
                $push: { upVotes: user._id.toString() },
                new: true,
            });
            await this.notificationService.createNotification({
                user,
                report,
                type: NotifyTypeEnum.upVote,
            });
        } else {
            await this.reportModel.findByIdAndUpdate(reportId, {
                $pull: { upVotes: user._id.toString() },
                new: true,
            });
        }
        return await this.findByReportId(reportId);
    }

    async addComment(user: User, commentData: CreateCommentInput,): Promise<Report> {
        const report = await this.findByReportId(commentData.reportId);
        if (!report) {
            throw new NotFoundException('ไม่สามารถหาการรายงานนั้นได้');
        }
        const comment = await this.commentsService.createComment({
            user: user,
            body: commentData.body,
        });
        await this.reportModel.findByIdAndUpdate(commentData.reportId, {
            $push: { comments: comment._id },
            new: true,
        });
        await this.notificationService.createNotification({
            user,
            report,
            type: NotifyTypeEnum.comment,
        });
        return await this.findByReportId(commentData.reportId);
    }

    async updateStatusReport(admin: Admin, updateStatusData: UpdateStatusReportInput,): Promise<Report> {
        const report = await this.reportModel.findByIdAndUpdate(
            updateStatusData.reportId,
            { status: { admin: admin._id.toString(), type: updateStatusData.type } },
            { new: true },
        );
        return report;
    }

    async addProgress(user: User, progressData: CreateProgressInput,): Promise<Report> {
        const report = await this.findByReportId(progressData.reportId);
        if (!report) {
            throw new NotFoundException('ไม่สามารถหาการรายงานนั้นได้');
        }
        const progress = await this.progressesService.createProgress(
            user,
            progressData,
        );
        await this.reportModel.findByIdAndUpdate(progressData.reportId, {
            $push: { progresses: progress._id },
            new: true,
        });
        return await this.findByReportId(progressData.reportId);
    }

    async updateReviewReport(user: User, updateReviewData: UpdateReviewReportInput,): Promise<Report> {
        const _report = await this.findByReportId(updateReviewData.reportId);
        if (user._id.toString() !== _report.user._id.toString()) {
            throw new NotFoundException('ต้องเป็นเจ้าของรายงานนั้นเท่านั้น');
        }
        const _medias = [];
        if (updateReviewData.medias?.length) {
            for (const m of updateReviewData.medias) {
                const media = await this.mediasService.createMedia(m);
                _medias.push(media._id);
            }
        }
        updateReviewData.medias = _medias;

        const report = await this.reportModel.findByIdAndUpdate(
            updateReviewData.reportId,
            {
                review: {
                    description: updateReviewData.description,
                    medias: updateReviewData.medias.map((m) => m._id.toString()),
                    star: updateReviewData.star,
                },
            },
            { new: true },
        );
        return report;
    }

    private _idReportsInTrend = [];
    @Cron('0 12 * * *')
    async updateTrends() {
        const reports = await this.reportModel.find({}).sort('-upVotes')
        const _reports = reports.filter(r => {
            return !this._idReportsInTrend.includes(r._id.toString())
        })
        if (_reports.length < 5) {
            this._idReportsInTrend = [...this._idReportsInTrend, ..._reports.map(r => r._id.toString())]
            await this.trendsService.updateTrends(_reports)
        } else {
            this._idReportsInTrend = [...this._idReportsInTrend, ..._reports.slice(0, 5).map(r => r._id.toString())]
            await this.trendsService.updateTrends(_reports.slice(0, 5))
        }
        this._idReportsInTrend = this._idReportsInTrend.filter(id => {
            return reports.some(_r => _r._id.toString() === id)
        })
        this.logger.debug('Updated Treads at 12.00 PM Everyday')
    }

    async getTrends(): Promise<Report[]> {
        let _reports = await this.trendsService.getTrends()
        if (_reports === null) {
            await this.updateTrends();
            _reports = await this.trendsService.getTrends()
        }
        const reports = []
        for (const report of _reports['reports']) {
            reports.push(await this.reportModel.findById(report._id))
        }
        return reports
    }

    async findByReportId(id: string) {
        return this.reportModel.findById(id);
    }

    async findMany(getReportsArgs: GetReportsArgs): Promise<PaginateReport> {
        const { sort, order, filter, tags, page, pageAmount } = getReportsArgs
        const checkTags = tags.filter((f) => (f != ""))
        
        const builder = new ReportsAggregateBuilder()
        const director = new AggregateDirector()
        director.setBuilder(builder)
        director.buildReportsAggregate(filter, checkTags, sort, order)
        
        const reports = await this.reportModel.aggregate(builder.getAggregate().pipeline)
        // const reports = await this.reportModel.aggregate([
        //     { $match: { 'status.type': { $in: filter.length ? filter : ["UNVERIFIED", "VERIFIED", "INPROGRESS", "COMPLETE"] } } },
        //     {
        //         $lookup:
        //         {
        //             from: "tags",
        //             localField: "tags",
        //             foreignField: "_id",
        //             as: "_tags"
        //         }
        //     },
        //     {
        //         $project: {
        //             ...project, ...length, ...  { 'isTags': { $gt: [{ $size: { $setIntersection: [checkTags, '$_tags.name'] } }, 0] } }
        //         }
        //     },
        //     {
        //         $sort: sort == SortEnum.sortByLike
        //             ? { 'upVotesLength': order == OrderEnum.ascending ? 1 : -1 } :
        //             sort == SortEnum.sortByComment
        //                 ? { 'commentsLength': order == OrderEnum.ascending ? 1 : -1 } :
        //                 { 'createdAt': order == OrderEnum.ascending ? 1 : -1 }
        //     },
        //     { $match: { 'isTags': (checkTags.length) ? true : false } },
        //     { $project: { ...project, } },
        // ])
        const nextPage = ((page + 1) * pageAmount < reports.length) ? page + 1 : -1
        return { reports: reports.slice(page * pageAmount, (page + 1) * pageAmount), nextPage, currentPage: page }
    }

    async findReportsByUser(user: User): Promise<Report[]> {
        const reports = await this.reportModel.find({user: user}).sort('-createdAt')
        return reports
    }

    async getPopularTags(tag: GetPopularTagsArgs) {
        const builder = new ReportsAggregateBuilder()
        const director = new AggregateDirector()
        director.setBuilder(builder)
        director.buildPopularTags(tag.name, 0 ,10)
        const _tags = await this.reportModel.aggregate(builder.getAggregate().pipeline)

        // const _tags = await this.reportModel.aggregate([
        //     {
        //         $lookup:
        //         {
        //             from: "tags",
        //             localField: "tags",
        //             foreignField: "_id",
        //             as: "_tags"
        //         }
        //     },
        //     {
        //         $unwind: '$_tags'
        //     },
        //     { $group: { _id: "$_tags", count: { $sum: 1 } } },
        //     { $sort: { 'count': -1 } },
        //     {
        //         $addFields: {
        //             returnObject: {
        //                 $regexFind: { input: { $toLower: "$_id.name" }, regex: { $toLower: tag.name } }
        //             }
        //         }
        //     },
        //     {
        //         $match: { returnObject: { $ne: null }, '_id.status': { $eq: 'VERIFIED' } }
        //     },
        //     { $skip: 0 },
        //     { $limit: 10 },
        //     {
        //         $project: {
        //             _id: '$_id._id',
        //             name: '$_id.name',
        //             status: '$_id.status',
        //             createdAt: '$_id.createdAt',
        //             updatedAt: '$_id.updatedAt',
        //             count: '$count',
        //         }
        //     }
        // ])
        return _tags
    }

    async deleteReport(deleteReportData: DeleteReportInput): Promise<Report> {
        const report = await this.reportModel.findById(deleteReportData._id)
        const deleted_report = await this.reportModel.deleteOne({ _id: deleteReportData._id }).exec()
        if (deleted_report.deletedCount === 0) {
            throw new NotFoundException('Could not find user id.')
        }
        return report
    }
}
