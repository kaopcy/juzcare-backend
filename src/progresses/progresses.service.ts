import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediasService } from 'src/medias/medias.service';
import { User } from 'src/users/models/user';
import { GetProgressesArgs } from './dto/args/get-progresses.args';
import { CreateProgressInput } from './dto/inputs/create-progress.input';
import { Progress, ProgressDocument } from './models/progress';

@Injectable()
export class ProgressesService {
    constructor(
        @InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>,
        private readonly mediasService: MediasService,

    ) {}

    // async createProgress(createProgressData: CreateProgressInput): Promise<Progress> {
    //     return this.progressModel.create(createProgressData)
    // }

    async createProgress(user: User, progressData: CreateProgressInput): Promise<Progress> {
        const _medias = []
        if (progressData.medias?.length) {
            for (const m of progressData.medias) {
                const media = await this.mediasService.createMedia(m)
                _medias.push(media._id)
            }
        }
        progressData.medias = _medias

        const _progress = {user: user._id.toString(), ...progressData}
        const progress = await this.progressModel.create(_progress)
        return progress
    }

    async getProgresses(getProgressesArgs: GetProgressesArgs): Promise<Progress[]> {
        if (!getProgressesArgs._ids.length) {
            return []
        }
        return this.progressModel.find({ _id: { $in: getProgressesArgs._ids } }).sort('-createdAt')
    }
}
