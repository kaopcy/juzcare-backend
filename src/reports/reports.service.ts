import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentInput } from 'src/comments/dto/inputs/create-comment.input';
import { MediasService } from 'src/medias/medias.service';
import { TagsService } from 'src/tags/tags.service';
import { User } from 'src/users/models/user';
import { CreateReportInput } from './dto/inputs/create-report.input';
import { Report, ReportDocument } from './models/report';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>,
        private readonly mediasService: MediasService,
        private readonly commentsService: CommentsService,
        private readonly tagsService: TagsService,
    ) { }

    async createReport(user: User, reportData: CreateReportInput): Promise<Report> {
        // console.log(reportData);

        // reportData.medias.map(async m => {
        //     const media = await this.mediasService.createMedia(m)
        //     console.log(media);
        //     return media
        // })
        const _medias = []
        if (reportData.medias?.length) {
            for (const m of reportData.medias) {
                const media = await this.mediasService.createMedia(m)
                _medias.push(media._id)
            }
        }
        reportData.medias = _medias

        const _tags = []

        if (reportData.tags.length) {
            for (const tag of reportData.tags) {
                // console.log(tag, !mongoose.Types.ObjectId.isValid(tag));
                if (!mongoose.Types.ObjectId.isValid(tag)) {
                    const duplicate_tag = await this.tagsService.getTagByName(tag)
                    let new_tag
                    if (!duplicate_tag) {
                        new_tag = await this.tagsService.createTag({ name: tag })
                    } else {
                        new_tag = duplicate_tag
                    }
                    _tags.push(new_tag._id.toString())
                } else {
                    _tags.push(tag)
                }
            }
            reportData.tags = _tags
        }

        const _report = { ...{ user: user._id.toString() }, ...reportData }
        const report = await this.reportModel.create(_report)
        return report
    }

    async upVoteReport(user: User, reportId: string): Promise<Report> {
        const report = await this.findByReportId(reportId)
        if (!report) {
            throw new NotFoundException('report id not found')
        }
        const isUpVoted = await this.reportModel.find({ _id: reportId, upVotes: user._id })

        if (!isUpVoted.length) {
            await this.reportModel.findByIdAndUpdate(reportId, { $push: { upVotes: user._id }, new: true })
        } else {
            await this.reportModel.findByIdAndUpdate(reportId, { $pull: { upVotes: user._id }, new: true })
        }
        return await this.findByReportId(reportId)
    }

    async addComment(user: User, commentData: CreateCommentInput): Promise<Report> {
        const report = await this.findByReportId(commentData.reportId)
        if (!report) {
            throw new NotFoundException('report id not found')
        }
        const comment = await this.commentsService.createComment({ user: user, body: commentData.body })
        await this.reportModel.findByIdAndUpdate(commentData.reportId, { $push: { comments: comment._id }, new: true })
        return await this.findByReportId(commentData.reportId)
    }

    async findByReportId(id: string) {
        return this.reportModel.findById(id)
    }

    async findMany() {
        // console.log(await this.reportModel.find({tags: {$in: ['6374f1ff57979609f697348d','637491d862a3c98ddac0ab47' ]}}));
        return this.reportModel.find({})
    }

}