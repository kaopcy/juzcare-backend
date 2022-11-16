import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
import { Report } from './models/report';
import { ReportsService } from './reports.service';

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
        
        ) { }

    @Query(() => Report, { nullable: true })
    @UseGuards(GqlAuthGuard)
    async report(@Args() getReportArgs: GetReportArgs) {
        return this.reportsService.findByReportId(getReportArgs._id)
    }

    @Query(() => [Report], { nullable: true })
    @UseGuards(GqlAuthGuard)
    async reports() {
        return this.reportsService.findMany()
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
        return this.progressesService.getProgresses({_ids: report.comments.map((c)=>c._id.toString())})
    }

    @ResolveField(() => Tag, {nullable: true})
    async tags(@Parent() report: Report) {
        return this.tagsService.getTags({_ids: report.tags.map((t) => t._id.toString())})
    }
    
    @Mutation(() => Report)
    @UseGuards(GqlAuthGuard)
    async upVoteReport(@CurrentUser() user: User, @Args() getReportArgs: GetReportArgs): Promise<Report> {
        const report = this.reportsService.upVoteReport(user, getReportArgs._id)
        return report
    }
}
