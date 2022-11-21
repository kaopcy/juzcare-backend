import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { CurrentUser } from 'src/auth/current-user.args';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentInput } from 'src/comments/dto/inputs/create-comment.input';
import { Comment } from 'src/comments/models/comment';
import { LocationsService } from 'src/locations/locations.service';
import { MediasService } from 'src/medias/medias.service';
import { Media } from 'src/medias/models/media';
import { CreateProgressInput } from 'src/progresses/dto/inputs/create-progress.input';
import { Progress } from 'src/progresses/models/progress';
import { ProgressesService } from 'src/progresses/progresses.service';
import { Tag } from 'src/tags/models/tag';
import { TagsService } from 'src/tags/tags.service';
import { User } from 'src/users/models/user';
import { UsersService } from 'src/users/users.service';
import { GetReportArgs } from './dto/args/get-report.args';
import { CreateReportInput } from './dto/inputs/create-report.input';
import { UpdateStatusReportInput } from './dto/inputs/update-status.report';
import { Status } from './models/status';
import { UpdateReviewReportInput } from './dto/inputs/update-review.dto';
import { Report } from './models/report';
import { Review } from './models/review';
import { ReportsService } from './reports.service';
import { GetReportsArgs } from './dto/args/get-reports.args';
import { PaginateReport } from './models/paginate.report';
import { GetPopularTagsArgs } from './dto/args/get-popular-tags.args';
import { AggregateTags } from 'src/tags/models/aggregate.tags';
import { DeleteReportInput } from './dto/inputs/delete-report.input';
@Resolver(() => Report)
export class ReportsResolver {
    constructor(
        private readonly reportsService: ReportsService,
        private readonly usersService: UsersService,
        private readonly mediasService: MediasService,
        private readonly commentsService: CommentsService,
        private readonly locationsService: LocationsService,
        private readonly tagsService: TagsService,
        private readonly progressesService: ProgressesService,
        private readonly adminsService: AdminsService,
        ) { }

    @Query(() => Report, { nullable: true })
    async report(@Args() getReportArgs: GetReportArgs) {
        return this.reportsService.findByReportId(getReportArgs._id)
    }

    // @Query(() => [Report], { nullable: true })
    // @UseGuards(GqlAuthGuard)
    // // @UseInterceptors(UpdateFlowInterceptor)
    // async reports(@Args() getReportsArgs: GetReportsArgs) {
    //     return this.reportsService.findMany(getReportsArgs)
    // }

    @Query(() => PaginateReport, { nullable: true })
    async reports(@Args() getReportsArgs: GetReportsArgs): Promise<PaginateReport> {
        return await this.reportsService.findMany(getReportsArgs)
    }

    @Query(() => [Report], { nullable: true })
    @UseGuards(GqlAuthGuard)
    async findReportsByUserId(@CurrentUser() user: User): Promise<Report[]> {
        return await this.reportsService.findReportsByUser(user)
    }

    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async createReport(@CurrentUser() user: User, @Args('createReportData') reportData: CreateReportInput): Promise<Report> {
        const report = this.reportsService.createReport(user, reportData)
        return report
    }

    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async createCommentReport(@CurrentUser() user: User, @Args('createCommentReportData') commentData: CreateCommentInput): Promise<Report>{
        return this.reportsService.addComment(user, commentData)
    }

    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async createProgressReport(@CurrentUser() user: User, @Args('createProgressReportData') progressData: CreateProgressInput): Promise<Report>{
        return this.reportsService.addProgress(user, progressData)
    }

    @ResolveField(() => User, { nullable: true })
    async user(@Parent() report: Report) {
        return this.usersService.findById(report.user._id)
    }

    @ResolveField(() => Location, { nullable: true })
    async location(@Parent() report: Report) {
        return this.locationsService.findById(report.location._id)
    }

    @ResolveField(() => [Media], { nullable: true })
    async medias(@Parent() report: Report) {
        return this.mediasService.getMedias({_ids: report.medias.map((m)=>m._id.toString())})
    }

    @ResolveField(() => [User], { nullable: true })
    async upVotes(@Parent() report: Report) {
        return this.usersService.getUsers({_ids: report.upVotes.map((uv)=>uv._id.toString())})
    }

    @ResolveField(() => [Comment], {nullable: true})
    async comments(@Parent() report: Report) {
        return this.commentsService.getComments({_ids: report.comments.map((c)=>c._id.toString())})
    }

    @ResolveField(() => [Progress], {nullable: true})
    async progresses(@Parent() report: Report) {
        return this.progressesService.getProgresses({_ids: report.progresses.map((c)=>c._id.toString())})
    }

    @ResolveField(() => Tag, {nullable: true})
    async tags(@Parent() report: Report) {
        return this.tagsService.getTags({_ids: report.tags.map((t) => t._id.toString())})
    }

    @ResolveField(() => Status, {nullable: true})
    async status(@Parent() report: Report): Promise<Status> {
        return report.status
    }
    
    // @ResolveField(() => Admin)
    // async admin(@Parent() status: Status): Promise<Admin> {
    //     if (!status.admin) {
    //         return null
    //     }
    //     return this.adminsService.findById(status.admin._id)
    // }

    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async updateStatusReport(@CurrentUser() admin: Admin, @Args('updateStatusReportData') updateStatusReport: UpdateStatusReportInput): Promise<Report> {
        await this.adminsService.verifyAdminRole(admin._id.toString())
        return await this.reportsService.updateStatusReport(admin, updateStatusReport)
    }

    @ResolveField(() => Review, { nullable: true })
    async review(@Parent() report: Report): Promise<Review> {
        return report.review
    }
    
    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async upVoteReport(@CurrentUser() user: User, @Args() getReportArgs: GetReportArgs): Promise<Report> {
        const report = await this.reportsService.upVoteReport(user, getReportArgs._id)
        return report
    }

    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async updateReviewReport(@CurrentUser() user: User, @Args('updateReviewReportData') updateReviewReport: UpdateReviewReportInput): Promise<Report> {
        return await this.reportsService.updateReviewReport(user, updateReviewReport)
    }

    @Query(() => [Report], { nullable: true })
    async trends() {
        return this.reportsService.getTrends()
    }

    @Query(() => [AggregateTags], { nullable: true })
    async getPopularTags(@Args() tag: GetPopularTagsArgs) {
        return this.reportsService.getPopularTags(tag)
    }

    @Mutation(() => Report)
    async deleteReport(@Args('deleteReportData') deleteReportData: DeleteReportInput): Promise<Report>{
        return this.reportsService.deleteReport(deleteReportData)
    }
}
