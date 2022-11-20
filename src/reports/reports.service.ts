import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
import { OrderEnum, SortEnum } from './dto/enum/query.enum';
import { length, project } from './dto/pipeline/aggregate.pipeline';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel(Report.name)
        private readonly reportModel: Model<ReportDocument>,
        private readonly mediasService: MediasService,
        private readonly commentsService: CommentsService,
        private readonly tagsService: TagsService,
        private readonly progressesService: ProgressesService,
        private readonly notificationService: NotificationService,
        private readonly trendsService: TrendsService,
        ) { }
    
    private readonly logger = new Logger(ReportsService.name);

    async createReport(user: User, reportData: CreateReportInput,): Promise<Report> {
        const _medias = [];
        if (reportData.medias?.length) {
            for (const m of reportData.medias) {
                const media = await this.mediasService.createMedia(m);
                _medias.push(media._id);
            }
        }
        reportData.medias = _medias;

        const _tags = [];

        if (reportData.tags.length) {
            for (const tag of reportData.tags) {
                // console.log(tag, !mongoose.Types.ObjectId.isValid(tag));
                if (!mongoose.Types.ObjectId.isValid(tag)) {
                    const duplicate_tag = await this.tagsService.getTagByName(tag);
                    let new_tag;
                    if (!duplicate_tag) {
                        new_tag = await this.tagsService.createTag({ name: tag });
                    } else {
                        new_tag = duplicate_tag;
                    }
                    _tags.push(new_tag._id.toString());
                } else {
                    _tags.push(tag);
                }
            }
            reportData.tags = _tags;
        }

        const _report = {
            ...{ user: user._id.toString() },
            ...reportData,
            status: {},
            review: {},
        };
        const report = await this.reportModel.create(_report);
        return report;
    }

    async upVoteReport(user: User, reportId: string): Promise<Report> {
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
                type: 'UPVOTE',
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
            type: 'COMMENT',
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
            $push: { comments: progress._id },
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
        if (_reports.length < 5 ) {
            this._idReportsInTrend = [ ...this._idReportsInTrend, ..._reports.map(r => r._id.toString())]
            await this.trendsService.updateTrends(_reports)
        } else {
            this._idReportsInTrend = [ ...this._idReportsInTrend, ..._reports.slice(0, 5).map(r => r._id.toString())]
            await this.trendsService.updateTrends(_reports.slice(0, 5))
        }
        this._idReportsInTrend = this._idReportsInTrend.filter(id => {
            return reports.some(_r => _r._id.toString() === id)
        })
        this.logger.debug('Updated Treads at 12.00 PM Everyday')
    }

    async getTrends(): Promise<Report[]> {
        const _reports = (await this.trendsService.getTrends())['reports']
        const reports = []
        for (const report of _reports) {
            reports.push(await this.reportModel.findById(report._id))
        }
        // const reports = await this.reportModel.find({_id: {$in: _reports.map((m) => (m._id.toString()))}})
        return reports
    }

    async findByReportId(id: string) {
        return this.reportModel.findById(id);
    }

    async findMany(getReportsArgs: GetReportsArgs) {
        const { sort, order, filter, tags, page, pageAmount } = getReportsArgs

        const reports = await this.reportModel.aggregate([
            // { $project: { 'isFilterExisted': { $or: [{ $eq: [filter, 'UNVERIFIED'] }, { $eq: [filter, 'VERIFIED'] }, { $eq: [filter, 'INPROGRESS'] }, , { $eq: [filter, 'COMPLETE'] }] } } },
            { $match: { 'status.type': filter } },
            // { $match: { 'status.type': 'COMPLETE' } },
            { $project: { ...project, ...length, ...  { 'isTags': { $gt: [{ $size: { $setIntersection: [tags.map(tag => new mongoose.Types.ObjectId(tag)), '$tags'] } }, 0] } } } },
            {
                $sort: sort == SortEnum.sortByLike
                    ? { 'upVotesLength': order == OrderEnum.ascending ? 1 : -1 } :
                    sort == SortEnum.sortByComment
                        ? { 'commentsLength': order == OrderEnum.ascending ? 1 : -1 } :
                        { 'createdAt': order == OrderEnum.ascending ? 1 : -1 }
            },
            { $match: { 'isTags': (tags.length) ? true : false } },
            // { $skip: 0 },
            // { $limit: 2 },
            { $project: { ...project, ...{ 'isTags': 1, 'isFilterExisted': 1 } } },
        ])
        console.log(reports.slice(page * pageAmount, (page + 1) * pageAmount));
        // console.log(reports.length, '\n');
        await this.updateTrends()
        return await this.reportModel.find({})
    }
}
