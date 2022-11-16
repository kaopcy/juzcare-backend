import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user';
import { GetProgressesArgs } from './dto/args/get-progresses.args';
import { Progress, ProgressDocument } from './models/progress';

@Injectable()
export class ProgressesService {
    constructor(
        @InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>,
    ) {}

    // async createProgress(createProgressData: CreateProgressInput): Promise<Progress> {
    //     return this.progressModel.create(createProgressData)
    // }

    async createProgress(createProgressData: {user: User, detail: string ,imageUrls: string[]}): Promise<Progress> {
        const _progress = {user: createProgressData.user._id.toString(), detail: createProgressData.detail, imageUrls: createProgressData.imageUrls}
        const progress = await this.progressModel.create(_progress)
        return progress
    }

    async getProgresses(getProgressesArgs: GetProgressesArgs): Promise<Progress[]> {
        if (!getProgressesArgs._ids.length) {
            return []
        }
        return this.progressModel.find({ _id: { $in: getProgressesArgs._ids } })
    }
}
