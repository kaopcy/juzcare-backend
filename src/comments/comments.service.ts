import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user';
import { GetCommentsArgs } from './dto/args/get-comments.args';
import { Comment, CommentDocument } from './models/comment';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    ){}

    async createComment(createCommentData: {user: User, body: string}): Promise<Comment> {
        const _comment = {user: createCommentData.user._id.toString(), body: createCommentData.body}
        const comment = await this.commentModel.create(_comment)
        return comment
    }

    async getComments(getCommentsArs: GetCommentsArgs): Promise<Comment[]> {
        if (!getCommentsArs._ids.length) {
            return []
        }
        return await this.commentModel.find({ _id: { $in: getCommentsArs._ids } }).sort('-createdAt')
    }
}
