import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetMediasArgs } from './dto/args/get-medias.args';
import { CreateMediaInput } from './dto/inputs/create-media.input';
import { Media, MediaDocument } from './models/media';

@Injectable()
export class MediasService {
    constructor(
        @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
    ) {}

    async createMedia(createMediaData: CreateMediaInput): Promise<Media> {
        return this.mediaModel.create(createMediaData)
    }

    async getMedias(getMediasArgs: GetMediasArgs): Promise<Media[]> {
        if (!getMediasArgs._ids.length) {
            return []
        }
        return this.mediaModel.find({ _id: { $in: getMediasArgs._ids } })
    }

}
